"use strict";

const buildHtmlElement = (places) => {
    const placeTable = document.getElementById('place-table');

    //Add table headers
    placeTable.innerHTML = 
    `<tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Map coordinates</th>
        <th colspan=2>Opening hours</th>
    </tr>`;

    places.forEach((place) => {
        const trView = document.createElement('tr')
        trView.classList.add(`btnDiv${place.id}`);
        trView.innerHTML = `
            <td>${place.id}</td> 
            <td>${place.title}</td>
            <td>${place.description}</td>
            <td>${place.coordinates}</td>
            <td>${place.opening_hours}</td>
            <td>
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Edit</button>
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Delete</button>
            </td>`;
            
        const trForm = document.createElement('tr')
        trForm.classList.add(`btnDiv${place.id}`, 'hidden');
        trForm.innerHTML = `
        <form>
            <td>${place.id}</td>
            <td><input type="text" id="${place.id}" name="title" value="${place.title}"></td> 
            <td><input type="text" id="${place.id}" name="description" value="${place.description}"></td>
            <td><input type="text" id="${place.id}" name="coordinates" value="${place.coordinates}"></td>
            <td><input type="text" id="${place.id}" name="opening_hours" value="${place.opening_hours}"></td>
            <td>
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Save</button>
                <button onClick="editBtnClicked( 'btnDiv${place.id}' ) ">Undo</button>
            </td>
        </form>`;
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