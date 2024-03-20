# Backend Overview

## Project Overview
This is the backend repository for the code snippet submission and display web application. It is built using Express.js and Node.js. Redis is used for caching information displayed on page 2, and MySQL is utilized for storing data related to code snippets.

## Getting Started
1. Clone this repository:
git clone (https://github.com/Devvarshney11/code-snippet-app-backend.git)

2. Navigate to the cloned directory:
cd TakeYou Forward BackEnd

3. Install dependencies:
npm install

4. Ensure Redis and MySQL servers are running.
5. Configure MySQL connection by updating the `config.js` file with the appropriate credentials.
6. Run the server:
npm start
7. The backend server should now be running on `http://localhost:5000`.

## Configuration
Ensure that Redis and MySQL servers are properly configured and accessible from the backend server. Update the `db.js` file with the appropriate database credentials.

## Features
- Provides RESTful APIs for submitting code snippets and retrieving submissions.
- Utilizes Redis caching to reduce the number of database read requests.
- Integrates with MySQL database to store code snippet data.
- Express.js is used for handling HTTP requests and responses.

## Bonus Tasks Completed
- Implemented Redis caching to optimize table information display.
- Utilized MySQL for data storage and retrieval.
- Integrated with Judge0 API in frontend to retrieve code snippet output.

## Links
- [Backend Repository](https://github.com/Devvarshney11/code-snippet-app-backend.git)
- [Hosted Backend Application](https://code-snippet-app-backend-2.onrender.com)
