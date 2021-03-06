"use strict";

let places;

// Refresh places-container when reloaded
const refreshPlaceContainer = (results) => {
    places = results;
    buildTableElement();
}

// Build places table using places-container
// parameters: filter keywords for filtering list
const buildTableElement = (filterTitle = "", filterTime = "" ) => {
    const placeTable = document.getElementById('place-table');

    //Add table headers
    placeTable.innerHTML = 
    `<tr>
        <th>Title</th>
        <th>Description</th>
        <th>Map coordinates</th>
        <th colspan=2>Opening hours</th>
    </tr>`;

    // Filtering logic
    const filteredPlaces = places.filter( place => 
        // Filter criteria #1: filterTitle included
        place.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        // Filter criteria #2: filterTime exists and is between open timefrmame
        ( filterTime === "" ? 
            true // Pass all if time not set
            :
            // Checking if given time between "from" and "to"
            ( Number(place.open_from) < Number(place.open_to) ?  
                Number(place.open_from) <= Number(filterTime) &&  
                Number(filterTime) < Number(place.open_to) 
                :
                Number(place.open_from) <= Number(filterTime) ||
                Number(filterTime) < Number(place.open_to)
            )
        )   
    );

    filteredPlaces.forEach((place) => {
        const trView = document.createElement('tr')
        trView.classList.add(`btnDiv${place.id}`, 'stripes');

        // One row for viewing data
        trView.innerHTML = `
            <td>${place.title}</td>
            <td>${place.description}</td>
            <td>${place.lat} : ${place.lng}</td>
            <td>${place.open_from} - ${place.open_to}</td>
            <td class="inline">
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Edit</button>
                <button onClick="deleteBtnClicked('${place.id}', '${place.title}')">Delete</button>
            </td>`;
            
        // One row for editing data (hidden by defauflt)
        const trForm = document.createElement('tr')
        trForm.classList.add(`btnDiv${place.id}`, 'hidden');
        trForm.innerHTML = `
            <td><input type="text" id="title${place.id}" value="${place.title}"></td> 
            <td><input type="text" id="description${place.id}" value="${place.description}"></td>
            <td class="inline">
                <input onchange="validateFloatValue(this.value, this.id)" type="text" 
                    id="lat${place.id}" value="${place.lat}">
                <input onchange="validateFloatValue(this.value, this.id)" type="text" 
                    id="lng${place.id}" value="${place.lng}">
            </td>
            <td class="inline">
                <input onkeyup="validateDayTimeHour(this.value, this.id)" type="text" 
                    id="open_from${place.id}" value="${place.open_from}">
                <input onkeyup="validateDayTimeHour(this.value, this.id)" type="text" 
                    id="open_to${place.id}" value="${place.open_to}">
            </td>
            <td class="inline">
                <button onClick="updatePlace('${place.id}')">Save</button>
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Undo</button>
            </td>`;
        placeTable.appendChild(trView);
        placeTable.appendChild(trForm);
    });
}
