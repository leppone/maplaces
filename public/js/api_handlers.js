"use strict";

const API_URL = "/api";


//Get a list of §
const getPlaces = async () => {

    let requestOptions = createRequestFor('GET');
    const response = await fetch(API_URL + '/places', requestOptions);
    const data = await getDataFromResponse(response);
    
    //Add places (results) to the table
    if(data != null)
        refreshPlaceContainer(data.results);
};


//Update selected item
const postPlace = async () => {

    // Create request and attach input data
    let requestOptions = createRequestFor('POST');
    let formData = new FormData(document.getElementById('createPlaceForm'));

    // Get data from form directly
    const nameObject = {};
    for(var pair of formData.entries()) {
        nameObject[pair[0]] = pair[1];
    }
    requestOptions.body = JSON.stringify(nameObject);

    // Send POST request to api and wait for response
    const response = await fetch(API_URL + `/places`, requestOptions);
    const data = await getDataFromResponse(response);

    // Refresh table        
    getPlaces();
};


//Update selected item
const updatePlace = async (id) => {

    // Create request and attach input data
    let requestOptions = createRequestFor('PUT');
    const nameObject = { 
        title: document.getElementById(`title${id}`).value,
        description: document.getElementById(`description${id}`).value,
        lat: document.getElementById(`lat${id}`).value, 
        lng: document.getElementById(`lng${id}`).value, 
        open_from: document.getElementById(`open_from${id}`).value,
        open_to: document.getElementById(`open_to${id}`).value 
    }
    requestOptions.body = JSON.stringify(nameObject);

    // Send PUT request to api and wait for response
    const response = await fetch(API_URL + `/places/${id}`, requestOptions);
    const data = await getDataFromResponse(response);

    // Refresh table
    getPlaces();
};


//Delete selected item
const deletePlace = async (id) => {

    // Create request
    let requestOptions = createRequestFor('DELETE');

    // Send DELETE request to api and wait for response
    const response = await fetch(API_URL + `/places/${id}`, requestOptions);
    const data = await getDataFromResponse(response);

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

// --- Helper function for handling fetch response
const getDataFromResponse = async (response) => {

    if (response.status === 200 || response.status === 201) {
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