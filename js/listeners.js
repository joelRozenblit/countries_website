import { COUNTRIES, COUNTRY_MAP, MAIN_DIV, INPUT, DROP_DOWN_MENU, RESULT_DIV } from "./global_variables.js"
import { navEvent, handleSortChange, handleCountrySelected } from "./app.js"
import { updateDropdown, renderMainPreview } from "./ui.js"



// nav - הוספת מאזינים ל
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        console.log("nav clicked");

        // מניעת פעולת ברירת מחדל (מעבר דף)
        event.preventDefault();

        // קבלת ה-id של הלינק שנלחץ
        const linkId = link.id;
        console.log(`Link clicked with ID: ${linkId}`);

        // קריאה לפונקציה שמטפלת באירוע עם המידע מה-id
        navEvent(linkId);
    });
});


// מאזין לאירוע הקלדה
INPUT.addEventListener("input", () => {
    console.log("input event");

    const searchValue = INPUT.value.toLowerCase();
    const filteredCountries = COUNTRIES.filter(country =>
        country.name.common.toLowerCase().startsWith(searchValue)
    );
    updateDropdown(filteredCountries);
    DROP_DOWN_MENU.classList.remove("hidden"); // הצגת התפריט
});


// מאזין לחיצה על שדה חיפוש
INPUT.addEventListener("click", () => {
    console.log("input click event");

    updateDropdown(COUNTRIES);
    DROP_DOWN_MENU.classList.remove("hidden"); // הצגת התפריט
});


// הסתרת התפריט בלחיצה מחוץ לאזור
document.addEventListener("click", (event) => {
    console.log("window click event");

    if (!document.querySelector("#dropdown-container").contains(event.target)) {
        DROP_DOWN_MENU.classList.add("hidden");
    }
});


// מאזין למיון
document.querySelector("#sort-options").addEventListener("change", () => {
    console.log("sort clicked");

    handleSortChange();
})


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
        console.log("preview click event");

        handleCountrySelected(country);
    });
}


// מאזין לינק מדינה שכינה
function neighbourListener() {
    const neighbours = document.querySelectorAll('[data-country]');

    neighbours.forEach(neighbour => {
        neighbour.addEventListener("click", (event) => {
            console.log("neighbour click event");

            event.preventDefault(); // למנוע את הפעולה הדיפולטיבית של הלינק

            const countryName = neighbour.getAttribute("data-country");
            const borderCountry = COUNTRIES.find(country => country.name.common === countryName);

            if (borderCountry) {
                handleCountrySelected(borderCountry);
            }
        });
    });
}


// מאזין לכפתור חזרה
function addBackListener() {
    const backButton = document.querySelector("#back_id");
    backButton.addEventListener("click", () => {
        console.log("Back button clicked");
        renderMainPreview();
    });
}



export { addPreviewListener, neighbourListener, addBackListener }