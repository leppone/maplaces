"use strict";

// Snap fingers if input time is not <24
const nullInputIfUnallowed = (input, id) => {
    if(isNaN(input) || input > 24) {
        document.getElementById(id).value = "";
    }
}