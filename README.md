Backend
Backend is coded in ExpressJS, with MongoDB as Database.

Setup
Clone the repository
git clone "https://github.com/Anubhavgupta14/Rule-Engine-with-AST.git"

Install dependencies:
npm install

I have uploaded .env file for your convenience.

Run the server:
npm start
The backend server will run on http://localhost:3001.

Backend Technologies
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework for creating API routes.
MongoDB: NoSQL database for storing rules and AST data.
Mongoose: ODM for MongoDB to define schema and interact with the database.

Backend Features
AST Parsing and Evaluation: Custom rules are parsed into AST format and evaluated based on the data.
CRUD Operations: Ability to create, modify, and evaluate rules.
Error Handling: Handles invalid rule strings, missing operators, and invalid data formats.
Rule Modification: Modify existing rules by changing operators, operands, or sub-expressions.
User-Defined Functions (Stub): Basic framework for adding custom functions like isPrime or isEven.

API Endpoints
Create Rule
Endpoint: POST /api/create_rule
Description: Create a new rule and store it in MongoDB.
Request Body:
json
{
  "rule": "(age > 18) AND (score >= 60)"
}
Response: Returns the AST for the rule created.

Evaluate Rule
Endpoint: POST /api/evaluate_rule
Description: Evaluate a rule based on user data.
Request Body:
json
Copy code
{
  "userData": {
    "age": 28,
    "score": 60
  }
}
Response:
json
Copy code
{
  "eligible": true
}
