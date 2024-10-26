const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const ruleParserRoutes = require("./routes/ruleParserRoutes");
const combineRulesRoutes = require("./routes/combineRulesRoutes");
const evaluateRulesRoutes = require("./routes/evaluateRulesRoutes");
const getData = require("./routes/getDataRoute")
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/create_rule', ruleParserRoutes);
app.use('/api/combine_rules', combineRulesRoutes);
app.use('/api/evaluate_rule', evaluateRulesRoutes);
app.use('/api/getData', getData);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
