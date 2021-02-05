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
const nullInputIfUnallowed = (input, id) => {
    if(isNaN(input) || input > 24) {
        document.getElementById(id).value = "";
    }
}