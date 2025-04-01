//=============================
//========= IMPORTS ===========

import {
    COUNTRIES,
    DROP_DOWN_MENU,
    CARD_CON, MAP_CON,
    FLAG_CON, DETAILS_CON,
    PREVIEW_CON
} from "./global_variables.js"
import {
    addPreviewListener
} from "./listeners.js";
import {
    getRandomCountries,
    getNeighboursLinks,
    getNeighbours,
    getLanguages,
    getCurrencies,
    getPopulation,
    calculateZoom
} from "./helper_functions.js"
import {
    handleCountrySelected,
    updateActiveCountries
} from "./app.js";

//=============================
//=============================



// הצגת תפריט מדינות
function updateDropdown(options) {
    DROP_DOWN_MENU.innerHTML = ""; // ניקוי תפריט קודם

    if (options.length === 0) {
        DROP_DOWN_MENU.innerHTML = `<li class="dark">No matching countries</li>`;
        return;
    }

    options.forEach(country => {
        const li = document.createElement("li");
        li.textContent = country.name.common;
        li.classList.add("dark");

        li.addEventListener("click", () => {
            console.log("li click event");

            DROP_DOWN_MENU.classList.add("hidden");
            handleCountrySelected(country);
        });

        DROP_DOWN_MENU.appendChild(li);
    });
}


// תצוגת מסך פתיחה
function renderMainPreview(randCountries = getRandomCountries()) { // יצירת מערך של 6 מדינות רנדומליות - אם לא מתקבל פרמטר 
    console.log(randCountries);
    // תצוגה מקדימה 
    renderCountries(randCountries);
}

// ניהול תצוגה מקדימה
function renderCountries(acticeCountries = [...COUNTRIES]) {
    clearScreen(); // ניקוי תוכן קיים

    for (const country of acticeCountries) {
        renderPreviewCard(country); // יצירת כרטיס מקדים לכל מדינה
    }

    updateActiveCountries(acticeCountries); // עדכון מערך המדינות המוצגות
}


// ניקוי תצוגה
function clearScreen() {
    PREVIEW_CON.innerHTML = "";
    MAP_CON.innerHTML = "";
    FLAG_CON.innerHTML = "";
    DETAILS_CON.innerHTML = "";
    document.querySelector("#back_con").innerHTML = "";
    document.querySelector("#search_input").value = "";
}


// כרטיס תצוגה מקדימה
function renderPreviewCard(country) {
    const _name = country.name.common;
    // הפיכת שם המדינה ל-ID חוקי
    const sanitizedId = _name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

    // הוספת כרטיס למדינה
    PREVIEW_CON.insertAdjacentHTML("beforeend", `
            <div class="card gray" style="width: 18rem;" id="${sanitizedId}_id">
                <div class="img-container" style="padding: 10px;">
                <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${_name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title white">${_name}</h5>
                </div>
            </div>
        `);
    // מאזין לבחירת מדינה
    addPreviewListener(sanitizedId, country);
}


// כרטיס מדינה מלא
function renderCountryCard(country) {
    try {
        console.log(country);
        // קבלת פרטים
        const currencies = getCurrencies(country);
        const languages = getLanguages(country);
        const neighbours = getNeighbours(country);
        const borderingCountriesLinks = getNeighboursLinks(neighbours);
        const population = getPopulation(country);

        FLAG_CON.insertAdjacentHTML("beforeend", `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        `);
        DETAILS_CON.insertAdjacentHTML("beforeend", `
            <h2>${country.name.common}</h2>
            <p>
                <b>Population:</b> ${population} <br>
                <b>Region:</b> ${country.region} <br>
                <b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"} <br>
                <b>Languages:</b> ${languages} <br>
                <b>Currency:</b> ${currencies} <br>
                <b>Bordering Countries:</b> ${borderingCountriesLinks}
            </p>
    `);
    } catch (error) {
        console.error("Error rendering card:", error);
        CARD_CON.innerHTML = `
            <p>Failed to load country details.<br> Please try again later.</p>
        `;
    }
}


// טעינת מפה
async function loadMap(country) {
    // בדיקה אם קיימים קואורדינטות
    if (!country.latlng || country.latlng.length < 2) {
        throw new Error("Missing coordinates for country.");
    }

    // חישוב זום מבוסס שטח המדינה
    const zoom = calculateZoom(country.area);

    MAP_CON.insertAdjacentHTML("beforeend", `
        <iframe 
            width="100%" 
            height="400px" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0"
            src="https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&hl=es&z=${zoom}&output=embed">
        </iframe>
    `);
    // הסרת הספינר רק אם המפה נטענה בהצלחה
    document.querySelector(".loader").classList.add("hidden");
}


// הדפסת loader
function renderSpinner() {
    MAP_CON.insertAdjacentHTML("beforeend", `
        <span class="loader"></span>
        `
    )
}


export {
    renderMainPreview,
    renderCountries,
    clearScreen,
    renderCountryCard,
    updateDropdown,
    loadMap,
    renderSpinner
};