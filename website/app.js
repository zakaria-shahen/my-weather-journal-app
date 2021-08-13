/* Global Variables */
const button = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');

// API OpenWeatherMap - NOT using (not for free)
const keyAPI = 'b44a2e29455b4a07a5b233954a0e112e';

// Get date
let d = new Date();
let date_now = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();



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




// query save zip code in server side (POST)
const save = async(dataQuery, url) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataQuery)
    });

    try {
        const temp = await res.body.json();
    } catch (err) {
        console.log(err);

    }
};


// Get Data (GET)
const getData = async() => {
    const res = await fetch('/all');
    try {
        dataClintSide = await res.json()
            .then(showTemp); // if is good run =>  run showTemp()
    } catch (err) {
        console.log('getData myError: ' + err);
    }

};

// add Event Listener button click 
generate.addEventListener('click', () => {
    // object save data
    let dataInput = { 'codeZIP': 0, 'feelings': '', 'date': date_now, 'temp': 0 };

    // Check Filed Not Empty
    if (zip.value.length !== 0 && feelings.value.length !== 0) {
        // Update dataInput
        dataInput.codeZIP = zip.value;
        dataInput.feelings = feelings.value;

        queryAPI(dataInput.codeZIP, keyAPI).then((d) => {
            dataInput.temp = d.main.temp;
            save(dataInput, '/saveDate') // Send dataInput server side 
                .then(getData()) // if run good => run getData()
                .catch((err) => console.log(err));
        });


    } else {
        window.alert('not input data');
    }

});

// show output 
function showTemp(dataClintSide) {
    temp.innerHTML = dataClintSide.temp;
    date.innerHTML = dataClintSide.date;
    content.innerHTML = dataClintSide.feelings;
}