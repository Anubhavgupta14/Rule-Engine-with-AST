const {Node,AST} = require("../ast"); // Node class to create AST nodes
const Rule = require("../models/Rule");

// Function to evaluate the combined AST with user data
const evaluateRuleProcess = (combinedAst, userData) => {
  const astInstance = new AST(); // Instantiate AST (make sure AST has an evaluate method)
  return astInstance.evaluate(combinedAst, userData); // Call evaluate on the AST instance
};

// Function to combine AST nodes of different rules
const processRules = (rules) => {
  if (!rules.length) return null;
  let combinedAst = rules[0];

  for (let i = 1; i < rules.length; i++) {
    const newRoot = new Node("operator", "AND"); // Use Node to create AST nodes
    newRoot.left = combinedAst;
    newRoot.right = rules[i];
    combinedAst = newRoot;
  }

  return combinedAst;
};

// Controller to evaluate combined rules for a user
const evaluateRule = async (req, res) => {
  try {
    // Fetch rules from the database
    const rules = await Rule.find();
    
    // Extract ASTs from rules
    const asts = rules.map((rule) => rule.ast);

    // Combine the ASTs
    const combinedAst = processRules(asts);

    // Evaluate the combined AST with user data from the request
    const result = evaluateRuleProcess(combinedAst, req.body.userData);
    
    // Send the result in the response
    res.status(200).send({ eligible: result });
  } catch (error) {
    res.status(500).send({ error: `Error evaluating rule: ${error.message}` });
  }
};

module.exports = { evaluateRule };
