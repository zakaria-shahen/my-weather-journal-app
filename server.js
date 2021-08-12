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

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// ------------------ Start code ---------

// API Weatherapi - using
const keyAPI = '9992788cb97b473b9ea193321211008';
const linkAPI = `https://api.weatherapi.com/v1/forecast.json?key=${keyAPI}&days=3&aqi=no&alerts=no&q=`;

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
        projectData.output.temp = output.forecast.forecastday[0].day.avgtemp_c;
        projectData.output.content = output.forecast.forecastday[0].day.condition.text;
        projectData.output.date = output.forecast.forecastday[0].date;

        // send result 
        res.send(projectData);

    }).catch((err) => console.log('get /route: Error', err));

});



// API OpenWeatherMap - NOT using (not for free)
// const keyAPI = '&appid=b44a2e29455b4a07a5b233954a0e112e';
// let linkAPI = 'https://pro.openweathermap.org/data/2.5/forecast/climate?zip=';