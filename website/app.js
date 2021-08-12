/* Global Variables */
const button = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');

// let dataClintSide = {};

// get Date output;
const getData = async(url) => {
    const res = await fetch(url);
    try {
        dataClintSide = await res.json().then(showTemp);
    } catch (err) {
        console.log('getData myError: ' + err);
    }

};


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


// add Event Listener button click 
generate.addEventListener('click', () => {
    let dataInput = { 'codeZIP': 0, 'feelings': '' };

    if (zip.value.length !== 0 && feelings.value.length !== 0) {
        dataInput.codeZIP = zip.value;
        dataInput.feelings = feelings.value;

        // data Testing: 85001 - hot

        queryWeather(dataInput) // 
            .then(getData('/route'))
            .catch((err) => console.log(err));
    } else {
        window.alert('not input data');
    }


});

// function showTemp(date, temp, content) {
function showTemp(dataClintSide) {
    temp.textContent = dataClintSide.output.temp;
    date.textContent = dataClintSide.output.date;
    content.textContent = dataClintSide.output.content;
}