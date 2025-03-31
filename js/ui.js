import { COUNTRIES, COUNTRY_MAP, MAIN_DIV, INPUT, DROP_DOWN_MENU, RESULT_DIV } from "./global_variables.js"
import { addPreviewListener, addBackListener } from "./listeners.js";
import { getRandomCountries, getNeighboursLinks, getNeighbours, getLanguages, getCurrencies, calculateZoom } from "./helper_functions.js"
import { handleCountrySelected, handleBackButton, updateActiveCountries } from "./app.js";


// הצגת תפריט מדינות
function updateDropdown(options) {
    DROP_DOWN_MENU.innerHTML = ""; // ניקוי תפריט קודם

    if (options.length === 0) {
        DROP_DOWN_MENU.innerHTML = "<li>No matching countries</li>";
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
    MAIN_DIV.innerHTML = "";
    document.querySelector("#back_con").innerHTML = "";
    document.querySelector("#search_input").value = "";
}


// כרטיס תצוגה מקדימה
function renderPreviewCard(country) {
    const _name = country.name.common;
    // הפיכת שם המדינה ל-ID חוקי
    const sanitizedId = _name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

    // הוספת כרטיס למדינה
    MAIN_DIV.insertAdjacentHTML("beforeend", `
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
async function printCard(country) {
    try {
        console.log(country);
        // קבלת מטבעות, שפות, שכנים ולינקים לשכנים
        const currencies = getCurrencies(country);
        const languages = getLanguages(country);
        const neighbours = getNeighbours(country);
        const borderingCountriesLinks = getNeighboursLinks(neighbours);

        MAIN_DIV.insertAdjacentHTML("beforeend", `
        <div>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        </div>
         
        <div>
            <h2>${country.name.common}</h2>
            <p>
                <b>Population:</b> ${country.population.toLocaleString()} <br>
                <b>Region:</b> ${country.region} <br>
                <b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"} <br>
                <b>Languages:</b> ${languages} <br>
                <b>Currency:</b> ${currencies} <br>
                <b>Bordering Countries:</b> ${borderingCountriesLinks}
            </p>
        </div>
        
        <div id="map-container">
            <span class="loader"></span>
        </div>
    `);

        // טעינת מפה והצגת ספינר בזמן הטעינה
        await loadMap(country);
        // הסרת הספינר רק אם המפה נטענה בהצלחה
        document.querySelector(".loader").classList.add("hidden");
        //
        handleBackButton();
    } catch (error) {
        console.error("Error rendering map or card:", error);
        document.querySelector("#map-container").innerHTML = `
            <p>Failed to load map or country details.<br> Please try again later.</p>
        `;
    }
}


//
async function loadMap(country) {
    // בדיקה אם קיימים קואורדינטות
    if (!country.latlng || country.latlng.length < 2) {
        throw new Error("Missing coordinates for country.");
    }

    // חישוב זום מבוסס שטח המדינה
    const zoom = calculateZoom(country.area);

    document.querySelector("#map-container").insertAdjacentHTML("beforeend", `
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
}




export {
    renderMainPreview,
    renderCountries,
    clearScreen,
    printCard,
    updateDropdown
};