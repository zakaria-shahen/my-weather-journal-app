// Setup empty JS object to act as endpoint for all routes
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

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server



// Callback to debug
let projectData = [];


const keyAPI = '&appid=b44a2e29455b4a07a5b233954a0e112e';
let linkAPI = 'https://pro.openweathermap.org/data/2.5/forecast/climate?zip=';

// Initialize all route with a callback function
app.get('/all', getData);
app.post('/check', postCheck);

// Callback function to complete GET '/all'
const getData = (req, res) => {
    const dataSend = projectData.join();
    res.send(dataSend);
};


const postCheck = (req, res) => {
    const data = req.body;
    projectData.push(data.temperature, date.date, date.UserResponse);
};


// Post Route