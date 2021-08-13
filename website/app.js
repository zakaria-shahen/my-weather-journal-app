/* Global Variables */
const button = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');


// query save zip code in server side (POST)
const queryWeather = async(dataQuery, url) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataQuery)
    });

    try {

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
    let dataInput = { 'codeZIP': 0, 'feelings': '' };

    // Check Filed Not Empty
    if (zip.value.length !== 0 && feelings.value.length !== 0) {
        // Update dataInput
        dataInput.codeZIP = zip.value;
        dataInput.feelings = feelings.value;


        queryWeather(dataInput, '/sendCodeZIP') // Send dataInput server side
            .then(getData()) // if run good => run getData()
            .catch((err) => console.log(err));
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