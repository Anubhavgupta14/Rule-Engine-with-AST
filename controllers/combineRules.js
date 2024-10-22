const Rule = require("../models/Rule");
const {Node} = require('../ast');

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

const combineRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    const asts = rules.map((rule) => rule.ast);
    const combinedAst = processRules(asts);
    res.status(200).send({ message: "Rules combined", combinedAst });
  } catch (error) {
    res.status(500).send({ error:`Error combining rules :${error}`});
  }
};

module.exports = { combineRules };
