/* Global Variables */
const button = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');


// query save zip code in server side (POST)
const queryWeather = async(dataQuery) => {
    const res = await fetch('/sendCodeZIP', {
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
const getData = async(url) => {
    const res = await fetch(url);
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


        queryWeather(dataInput) // Send dataInput server side
            .then(getData('/route')) // if run good => run getData()
            .catch((err) => console.log(err));
    } else {
        window.alert('not input data');
    }

});

// show output 
function showTemp(dataClintSide) {
    temp.textContent = dataClintSide.output.temp;
    date.textContent = dataClintSide.output.date;
    content.textContent = dataClintSide.output.content;
}