import { COUNTRIES } from "./api.js"
const COUNTRY_MAP = new Map(COUNTRIES.map(country => [country.cca3, country]));
const MAIN_DIV = document.querySelector("#main_div");


// הדפסת תפריט בחירת מדינה
function renderSelectBar() {
    const select = document.querySelector("#select_id");

    // תגית ברירת מחדל
    select.innerHTML =
        `
    

     <option value="disabled" disabled selected>pick a country</option>
    `

    for (const country of COUNTRIES) {
        const _name = country.name.common;
        select.innerHTML +=
            `
        <option value="${_name}">${_name}</option>
        `
    }
}


// ניקוי תצוגה
function clearScreen() {
    MAIN_DIV.innerHTML = "";
    document.querySelector("#back_con").innerHTML = "";
}


//
function clearInput() {
    document.querySelector("#search_id").value = '';
}


// תצוגת כרטיס מדינה
function renderCountryCard(selectedCountry) {
    printCard(selectedCountry);
    neighbourListener();
}


// תצוגת מסך פתיחה
function renderMainPreview() {
    clearScreen();
    // יצירת מערך של 6 מדינות רנדומליות
    const randCountries = getRandomCountries();
    console.log(randCountries);
    // תצוגה מקדימה 
    renderCountries(randCountries);
}


// יצירת מערך של 6 מדינות רנדומליות
function getRandomCountries(count = 5) {
    const indices = new Set();
    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * COUNTRIES.length));
    }
    return Array.from(indices).map(index => COUNTRIES[index]);
}


// כרטיס תצוגה מקדימה
function renderPreview(country) {
    const _name = country.name.common;
    // הפיכת שם המדינה ל-ID חוקי
    const sanitizedId = _name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");

    // הוספת כרטיס למדינה
    MAIN_DIV.insertAdjacentHTML("beforeend", `
            <div class="card" style="width: 18rem;" id="${sanitizedId}_id">
                <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${_name}">
                <div class="card-body">
                    <h5 class="card-title">${_name}</h5>
                </div>
            </div>
        `);
    // מאזין לבחירת מדינה
    addPreviewListener(sanitizedId, country);

}


// מאזין לבחירת מדינה
function addPreviewListener(id, country) {
    // ID - בחירת האלמנט לפי ה
    const country_element = document.querySelector(`#${id}_id`);
    if (!country_element) {
        console.error(`Element with ID ${id}_id not found`);
        return;
    }

    // הוספת מאזין לחיצה
    country_element.addEventListener("click", () => {
        clearScreen();
        clearInput();

        renderCountryCard(country);
    });
}


// תצוגה מקדימה - כל המדינות
function renderCountries(acticeCountries = [...COUNTRIES]) {
    clearScreen(); // ניקוי תוכן קיים

    for (const country of acticeCountries) {
        renderPreview(country); // יצירת כרטיס מקדים לכל מדינה
    }
}


// הוספת כפתור חזרה
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
    const backButton = document.querySelector("#back_id");
    backButton.addEventListener("click", () => {
        console.log("Back button clicked");
        renderMainPreview();
    });
}


// מאזין לינק מדינה שכינה
function neighbourListener() {
    const neighbours = document.querySelectorAll('[data-country]');

    neighbours.forEach(neighbour => {
        neighbour.addEventListener("click", (event) => {
            event.preventDefault(); // למנוע את הפעולה הדיפולטיבית של הלינק

            const countryName = neighbour.getAttribute("data-country");
            const borderCountry = COUNTRIES.find(country => country.name.common === countryName);

            if (borderCountry) {
                clearScreen();
                renderCountryCard(borderCountry);
            }
        });
    });
}


//
function getCurrencies(country) {
    const c = country.currencies ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol || 'N/A'})`).join(", ") : "N/A";

    return c;
}

//
function getLanguages(country) {
    const l = country.languages ? Object.values(country.languages).join(", ") : "N/A";

    return l;
}

//
function getNeighbours(country) {
    return (country.borders || []).map(border => COUNTRY_MAP.get(border)?.name.common || "Unknown");
}

//
function getNeighboursLinks(neighbours) {
    const n_l = neighbours.length > 0
        ? neighbours.map(country => {
            return `<a href="#" data-country="${country}" title="${country}">${country}</a>`;
        }).join(", ")
        : "no neighboring countries";

    return n_l;
}


//
function printCard(country) {
    try {
    // קבלת מטבעות, שפות, שכנים ולינקים לשכנים
    const currencies = getCurrencies(country);
    const languages = getLanguages(country);
    const neighbours = getNeighbours(country);
    const borderingCountriesLinks = getNeighboursLinks(neighbours);
    // חישוב זום מבוסס שטח המדינה
    const zoom = calculateZoom(country.area);

    MAIN_DIV.insertAdjacentHTML("beforeend", `
        <div>
            <img src="${country.flags.png}" class="" alt="Flag of ${country.name.common}">
        </div>
         
        <div>
            <h2 class="">${country.name.common}</h2>
            <p class="">
                <b>Population:</b> ${country.population.toLocaleString()} <br>
                <b>Region:</b> ${country.region} <br>
                <b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"} <br>
                <b>Languages:</b> ${languages} <br>
                <b>Currency:</b> ${currencies} <br>
                <b>Bordering Countries:</b> ${borderingCountriesLinks}
            </p>
        </div>

        <div>
            <iframe 
                width="100%" 
                height="400px" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0"
                src="https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&hl=es&z=${zoom}&output=embed">
            </iframe>
        </div>
    `);

    handleBackButton();
    
    } catch (error) {
        console.error("Error rendering map or card:", error);
        document.querySelector("#main_div").innerHTML = `
            <p>Failed to load map or country details. Please try again later.</p>
        `;
    }
}

// 
function calculateZoom(area) {
    if (!area || isNaN(area)) return 6 // ערך ברירת מחדל אם אין נתון
    if (area < 5000) return 8; // מדינות קטנות
    if (area < 20000) return 7; // מדינות בינוניות
    if (area < 100000) return 6; // מדינות בינוניות-גדולות
    return 5; // מדינות גדולות
}


export { renderSelectBar, renderCountryCard, renderMainPreview, renderPreview, renderCountries, clearScreen, clearInput };