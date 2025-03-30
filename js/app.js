import { COUNTRIES } from "./global_variables.js";
import { renderMainPreview, renderCountries, clearScreen, printCard } from "./ui.js";
import { neighbourListener, addBackListener } from "./listeners.js"

let activeCountries = [...COUNTRIES];


// nav - ניהול אירוע
function navEvent(linkId) {
    clearScreen(); // ניקוי המסך

    if (linkId === "all") {
        renderCountries();
        return;
    }

    const filteredCountries = COUNTRIES.filter(
        (country) => country.region.toLowerCase() === linkId.toLowerCase()
    );

    if (filteredCountries.length > 0) {
        activeCountries = [...filteredCountries];
        handleSortChange(); // עדכון המיון
        renderCountries(activeCountries); // תצוגה מחדש
    } else {
        main_div.innerHTML = "<p>No countries found in this region.</p>";
    }
}


// עדכון המדינות המוצגות
function updateActiveCountries(countries) {
    activeCountries = [...countries];
}


// ניהול בחירת מיון
function handleSortChange() {
    const sortBy = document.querySelector("#sort-options").value;

    activeCountries.sort((a, b) => {
        if (sortBy === "name") {
            return a.name.common.localeCompare(b.name.common);
        } else if (sortBy === "population") {
            return b.population - a.population;
        } else if (sortBy === "area") {
            return b.area - a.area;
        }
        return 0;
    });

    renderCountries(activeCountries);
}


// ניהול אירוע בחירת מדינה
function handleCountrySelected(country) {
    clearScreen();
    printCard(country);
    neighbourListener();
}


// ניהול כפתור חזרה
function handleBackButton() {
    const backCon = document.querySelector("#back_con");

    // מחיקה של כפתור קיים אם נמצא
    const existingButton = document.querySelector("#back_id");
    if (existingButton) {
        existingButton.remove();
    }

    // הוספת כפתור חזרה
    backCon.insertAdjacentHTML("beforeend", `
        <button id="back_id" class="btn btn-primary">Back</button>
    `);

    // מאזין לחיצה לכפתור
    addBackListener();
}


//==================================
// ======== program start ========
//==================================
renderMainPreview();
//==================================

export { navEvent, handleSortChange, handleCountrySelected, handleBackButton, updateActiveCountries }