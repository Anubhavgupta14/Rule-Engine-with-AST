const {Node} = require('../ast');
const Rule = require('../models/Rule');

const operators = ["AND", "OR"];
const comparisonOperators = [">", "<", "=", "!=", ">=", "<="];

// Tokenize function
const tokenize = (ruleString) => {
  const regex = /\s*(\(|\)|AND|OR|>|<|=|!=|>=|<=|'[^']*'|\w+)\s*/g;
  return ruleString.match(regex).map((token) => token.trim());
};

// Parse the operand, but now expect tokens separately (e.g., 'age', '>', '30')
const parseOperand = (attribute, operator, value) => {
  if (!attribute || !operator || value === undefined) {
    throw new Error(`Invalid operand: ${attribute} ${operator} ${value}`);
  }
  return [attribute, operator, value.replace(/'/g, "")];
};

const parse = (tokens) => {
  const stack = [];
  let node = null;
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token === "(") {
      stack.push(node);
      node = null;
      i++;
    } else if (token === ")") {
      const prevNode = stack.pop();
      if (prevNode) {
        prevNode.right = node;
        node = prevNode;
      }
      i++;
    } else if (operators.includes(token)) {
      const operatorNode = new Node("operator", token);
      operatorNode.left = node;
      node = operatorNode;
      i++;
    } else if (comparisonOperators.includes(tokens[i + 1])) {
      // Detecting an operand sequence (e.g., 'age > 30')
      const attribute = token;
      const operator = tokens[i + 1];
      const value = tokens[i + 2];
      const operand = parseOperand(attribute, operator, value);
      const operandNode = new Node("operand", operand);

      if (node) {
        node.right = operandNode;
      } else {
        node = operandNode;
      }

      // Move the index forward to skip the operand tokens
      i += 3;
    } else {
      i++;
    }
  }

  return node;
};

const createRule = async (req, res) => {
  try {
    const { rule } = req.body;
    console.log(rule)
    // Tokenize and parse the rule
    const tokens = tokenize(rule);
    console.log(tokens)
    const ruleAst = parse(tokens);
    console.log(ruleAst)
    if(!ruleAst){
      return res.status(200).json({error:"Invalid Rule Format. Try Again"})
    }
    // Save the rule and its AST to MongoDB
    const ruleString = new Rule({ ruleString: rule, ast: ruleAst });
    await ruleString.save();

    return res.status(200).json({ message: "Rule created successfully", data: ruleAst });
  } catch (err) {
    return res.status(400).json({ error: `Error while creating rule: ${err.message}` });
  }
};

module.exports = { createRule };
