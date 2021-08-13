// environment variables
// require('dotenv').config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};


// Express to run server and routes
const express = require('express');
const app = express();
const fetch = require('node-fetch');

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

// API Weatherapi - using
// const keyAPI = process.env.keyAPI_OpenWeatherMap;
const keyAPI = 'b44a2e29455b4a07a5b233954a0e112e';

// save code zip request (POST)
app.post('/sendCodeZIP', (req, res) => {
    const data = req.body; // get data request

    // update projectDate object
    projectData = data;

    res.send(projectData);

});

// fetch data API
const queryAPI = async(codeZIP, key) => {
    try {
        const linkAPI = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=imperial&zip=`;
        const newDate = await fetch(linkAPI + codeZIP);
        return await newDate.json();
    } catch (err) {
        console.log(err);
    }
}

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req, res) {
    queryAPI(projectData.codeZIP, keyAPI).then((output) => {
        // update project.output object 
        projectData.temp = output.main.temp;
        // projectData.content = output.weather[0].description;

        // get date
        let d = new Date();
        projectData.date = +d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
        // send result 
        res.send(projectData);

    }).catch((err) => console.log('get /route: Error', err));
}




// API OpenWeatherMap - NOT using (not for free)
// const keyAPI = process.env.keyAPI_OpenWeatherMap;
// let linkAPI = 'https://pro.openweathermap.org/data/2.5/forecast/climate?zip=';