"use strict";

const API_URL = "http://localhost:5000/api/";

//Get a list of places
const getPlaces = async () => {

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let requestOptions = {
        headers: myHeaders,
    };

    requestOptions.method = 'GET';
    const response = await fetch(API_URL + 'places', requestOptions);

    if (response.status === 200) {
        const data = await response.json();
        const places = data.results;

        //Add places to the table
        buildHtmlElement(places);
    } else {
        const div = document.createElement('div');
        const message = `Something went wrong with your request (${response.status})`;
        div.innerHTML = message;
        document.body.appendChild(div);
    }

};
