// environment variables
// require('dotenv').config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};


// Express to run server and routes
const express = require('express');
const app = express();

// Start up an instance of app
const port = 9999;
const server = app.listen(port, () => {
    console.log('Start server - Post ' + port);
});

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
const { copyFileSync } = require('fs');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// ------------------ Start code ---------


// save code zip request (POST)
app.post('/saveDate', (req, res) => {
    const data = req.body; // get data request

    // update projectDate object
    projectData = data;

});

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req, res) {
    // .then((output) => {

    //     // // update project.output object 
    //     // projectData.temp = output.main.temp;


    //     // send result 
    //     res.send(projectData);

    // }).catch((err) => console.log('get /route: Error', err));

    res.send(projectData);
}