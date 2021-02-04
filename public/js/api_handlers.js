"use strict";

const API_URL = "http://localhost:5000/api/";

//Get a list of places
const getPlaces = async () => {

    let requestOptions = createRequestFor('GET');
    const response = await fetch(API_URL + 'places', requestOptions);
    const data = await getDataFromResponse(response);
    
    //Add places (results) to the table
    if(data != null)
        buildHtmlElement(data.results);
};

//Update selected item
const updatePlace = async (id) => {

    // Create request and attach input data
    let requestOptions = createRequestFor('PUT');
    const nameObject = { 
        title: document.getElementById(`title${id}`).value,
        description: document.getElementById(`description${id}`).value,
        coordinates: document.getElementById(`coordinates${id}`).value, 
        opening_hours: document.getElementById(`opening_hours${id}`).value 
    }
    requestOptions.body = JSON.stringify(nameObject);

    // Send PUT request to api and wait for response
    const response = await fetch(API_URL + `places/${id}`, requestOptions);
    const data = await getDataFromResponse(response);
    console.log(data);

    // Refresh table
    getPlaces();
};


//Delete selected item
const deletePlace = async (id) => {

    // Create request
    let requestOptions = createRequestFor('DELETE');

    // Send DELETE request to api and wait for response
    const response = await fetch(API_URL + `places/${id}`, requestOptions);
    const data = await getDataFromResponse(response);
    console.log(data);

    // Refresh table
    getPlaces();
};


// --- Helper function for creating request structure
const createRequestFor = (type) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let requestOptions = {
        headers: myHeaders,
    };
    requestOptions.method = type;

    return requestOptions;
};


const getDataFromResponse = async (response) => {
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        const div = document.createElement('div');
        const message = `Something went wrong with your request (${response.status})`;
        div.innerHTML = message;
        document.body.appendChild(div);
        
        // In case of error, return null
        return null;
    }
};