const {Node,AST} = require("../ast");
const Rule = require("../models/Rule");

const evaluateRuleProcess = (combinedAst, userData) => {
  const astInstance = new AST();
  return astInstance.evaluate(combinedAst, userData);
};

const processRules = (rules) => {
  if (!rules.length) return null;
  let combinedAst = rules[0];

  for (let i = 1; i < rules.length; i++) {
    const newRoot = new Node("operator", "AND");
    newRoot.left = combinedAst;
    newRoot.right = rules[i];
    combinedAst = newRoot;
  }

  return combinedAst;
};

const evaluateRule = async (req, res) => {
  try {
    const rules = await Rule.find();

    const asts = rules.map((rule) => rule.ast);
    const combinedAst = processRules(asts);
    const result = evaluateRuleProcess(combinedAst, req.body.userData);
  
    return res.status(200).send({ eligible: result });
  } catch (error) {
    return res.status(500).send({ error: `Error evaluating rule: ${error.message}` });
  }
};

module.exports = { evaluateRule };
