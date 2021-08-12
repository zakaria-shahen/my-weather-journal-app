// Setup empty JS object to act as endpoint for all routes
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
// Spin up the server

// Callback to debug
const projectData = {
    'codeZIP': 0,
    'feeling': '',
    'output': {
        'temp': 0,
        'date': 0,
        'content': 0
    }
};



// API Weatherapi - using
const keyAPI = '9992788cb97b473b9ea193321211008';
const linkAPI = `https://api.weatherapi.com/v1/forecast.json?key=${keyAPI}&days=3&aqi=no&alerts=no&q=`;


// fetch data api
const queryAPI = async(codeZIP) => {
    try {
        const newDate = await fetch(linkAPI + codeZIP);
        return await newDate.json();
    } catch (err) {
        console.log(err);
    }
}


// Initialize all route with a callback function
app.get('/route', (req, res) => {
    queryAPI(projectData.codeZIP).then((output) => {
        projectData.output.temp = output.forecast.forecastday[0].day.avgtemp_c;
        projectData.output.content = output.forecast.forecastday[0].day.condition.text;
        projectData.output.date = output.forecast.forecastday[0].date;
        res.send(projectData);

    }).catch(() => console.log('get /route: Error'));

});


// Callback function to complete GET '/all'


app.post('/sendCodeZIP', (req, res) => {
    const data = req.body;
    projectData.codeZIP = data.codeZIP;
    projectData.feeling = data.feeling;
    res.send(projectData);
});

// Post Route



// API OpenWeatherMap - NOT using
// const keyAPI = '&appid=b44a2e29455b4a07a5b233954a0e112e';
// let linkAPI = 'https://pro.openweathermap.org/data/2.5/forecast/climate?zip=';