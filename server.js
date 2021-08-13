// environment variables
require('dotenv').config();

// Setup empty JS object to act as endpoint for all routes
const projectData = {
    'codeZIP': 0,
    'feeling': '',
    'output': {
        'temp': 0,
        'date': 0,
        'content': 0
    }
};


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
const keyAPI = process.env.keyAPI_OpenWeatherMap;
const linkAPI = `https://api.openweathermap.org/data/2.5/weather?appid=${keyAPI}&units=metric&zip=`;

// save code zip request (POST)
app.post('/sendCodeZIP', (req, res) => {
    const data = req.body; // get data request

    // update projectDate object
    projectData.codeZIP = data.codeZIP;
    projectData.feeling = data.feeling;
    res.send(projectData);

});

// fetch data API
const queryAPI = async(codeZIP) => {
    try {
        const newDate = await fetch(linkAPI + codeZIP);
        return await newDate.json();
    } catch (err) {
        console.log(err);
    }
}

// get Weather data request (GET)
app.get('/route', (req, res) => {
    queryAPI(projectData.codeZIP).then((output) => {
        // update project.output object 
        projectData.output.temp = output.main.temp;
        projectData.output.content = output.weather[0].description;

        // get date
        let d = new Date();
        projectData.output.date = +d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
        // send result 
        res.send(projectData);

    }).catch((err) => console.log('get /route: Error', err));

});



// API OpenWeatherMap - NOT using (not for free)
// const keyAPI = process.env.keyAPI_OpenWeatherMap;
// let linkAPI = 'https://pro.openweathermap.org/data/2.5/forecast/climate?zip=';