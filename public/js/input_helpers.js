"use strict";

// Stored filter keywords
let timeFilter, titleFilter;

// Save timeFilter keyword and build table again
const filterTime = (input) => {
    timeFilter = input;
    buildTableElement(titleFilter, timeFilter);
}

// Save titleFilter keyword and build table again
const filterTitle = (input) => {
    titleFilter = input;
    buildTableElement(titleFilter, timeFilter);
}

// Null input field if value time is not <24
const validateDayTimeHour = (input, id) => {
    if(isNaN(input) || input > 24) {
        document.getElementById(id).value = "";
    }
}


// Null input field if value is not float
const validateFloatValue = (input, id) => {
    if(isNaN(input) || input % 1 === 0) {
        document.getElementById(id).value = "";
    }
}


// Edit/save/undo/delete buttons toggled
const editBtnClicked = (id) => {
    const switchElements = Array.from(document.getElementsByClassName(id));
    switchElements.forEach((elem) => {
        elem.classList.toggle("hidden");
    })
};

// Alert whem delete clicked
const deleteBtnClicked = (id, title) => {
    if( confirm(`Really delete ${title}?`) ) {
        deletePlace(id);
    }
}