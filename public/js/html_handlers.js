"use strict";

const buildHtmlElement = (places) => {
    const placeTable = document.getElementById('place-table');

    //Add table headers
    placeTable.innerHTML = 
    `<tr>
        <th>Title</th>
        <th>Description</th>
        <th>Map coordinates</th>
        <th colspan=2>Opening hours</th>
    </tr>`;

    places.forEach((place) => {
        const trView = document.createElement('tr')
        trView.classList.add(`btnDiv${place.id}`, 'stripes');

        // One row for viewing data
        trView.innerHTML = `
            <td>${place.title}</td>
            <td>${place.description}</td>
            <td>${place.coordinates}</td>
            <td>${place.opening_hours}</td>
            <td class="inline">
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Edit</button>
                <button onClick="deletePlace('${place.id}')">Delete</button>
            </td>`;
            
        // One row for editing data (hidden by default)
        const trForm = document.createElement('tr')
        trForm.classList.add(`btnDiv${place.id}`, 'hidden');
        trForm.innerHTML = `
            <td><input type="text" id="title${place.id}" value="${place.title}"></td> 
            <td><input type="text" id="description${place.id}" value="${place.description}"></td>
            <td><input type="text" id="coordinates${place.id}" value="${place.coordinates}"></td>
            <td><input type="text" id="opening_hours${place.id}" value="${place.opening_hours}"></td>
            <td>
                <button onClick="updatePlace('${place.id}')">Save</button>
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Undo</button>
            </td>`;
        placeTable.appendChild(trView);
        placeTable.appendChild(trForm);
    });
}

const editBtnClicked = (id) => {
    const switchElements = Array.from(document.getElementsByClassName(id));
    console.log(switchElements)
    switchElements.forEach((elem) => {
        elem.classList.toggle("hidden");
    })
};