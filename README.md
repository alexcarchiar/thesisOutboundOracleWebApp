# WebApp for Blockchain oracle security Thesis
Title of the Thesis: Securing the bridges between two worlds: a Systematic Literature Review of Blockchain Oracles security Institutions:

Aalto University, Finland
Tartu University, Estonia
Student: Alessandro Chiarelli

Supervisors:

Prof. Raimundas Matulevicius
PhD. Mubashar Iqbal
Prof. Fabian Fagerholm

# Description
WebApp for the thesis project - it is the data destination for the outbound oracle. For a detailed description of the use case, see the Thesis

The WebApp simulates a centralized destination for an outbound blockchain oracle. 

The WebApp is a Proof of Concept that simply queries the required data and processes it.

https://github.com/alexcarchiar/BlockchainOracles
https://github.com/alexcarchiar/thesisWebApp
Technologies
The technologies used for this WebApp are:

- Node.js / npm to create and manage the app
- MongoDB Atlas is used as a Database
- Mongoose.js to interact with MongoDB from the app
- Express.js to manage Middlewares and Routes
- Cors.js to allow interacting with the app form any IP
- Body-parser.js to parse the HTTP requests and responses
- Dotenv.js to deal with environment variables
- Nodemon.js to run the app in a test environment
- Render.com to deploy the app and manage CI/CD
- This Github repository for CI/CD

## How to run
In order to run the app, you need to have Node.js and npm with the latest update available at the time this document was written: 9.3.1

You also need your own MongoDB database, otherwise you will not be able to use the API.

Once you download this repository, you need to run npm install and npm start to run it in a test environment using Nodemon.

You need to create a .env file where you have the variable DB_CONNECTION set to the URL of your personal database.

The app will run on localhost:3000.

## Demo
One demo is available here: https://outbound-oracle-thesis-web-app.onrender.com
