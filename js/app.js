import { COUNTRIES } from "./global_variables.js";
import { renderMainPreview, renderCountries, clearScreen } from "./ui.js";

let activeCountries = [...COUNTRIES];


function init() {
    try {
        // תצוגת פתיחה
        renderMainPreview();

        // vav - הוספת מאזין לאירוע בחירה ב
        addNavListener();

        // הוספת מאזין למיון
        addSortListener();
    } catch (err) {
        console.error("Error initializing application:", err);
    }
}


// nav - הוספת מאזין ל
function addNavListener() {
    // בוחרים את כל הקישורים ב-Nav
    const navLinks = document.querySelectorAll(".nav-link");

    // לולאה שעוברת על כל קישור ומוסיפה מאזין
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            // מניעת פעולת ברירת מחדל (מעבר דף)
            event.preventDefault();

            // קבלת ה-id של הלינק שנלחץ
            const linkId = link.id;
            console.log(`Link clicked with ID: ${linkId}`);

            // קריאה לפונקציה שמטפלת באירוע עם המידע מה-id
            navEvent(linkId);
        });
    });
}


// nav - טיפול באירוע
function navEvent(linkId) {
    clearScreen(); // ניקוי המסך
    // clearInput();

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


// מאזין למיון
function addSortListener() {
    document.querySelector("#sort-options").addEventListener("change", () => {
        handleSortChange();
    })
}


// מיון המדינות המוצגות
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



// קריאה לפונקציה הראשית
init();
