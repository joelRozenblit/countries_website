import { COUNTRIES } from "./api.js";
import { renderSelectBar, renderCountryCard, renderMainPreview, renderCountries, clearScreen, clearInput } from "./ui.js";

let activeCountries = [...COUNTRIES];


async function init() {
    try {
        // הצגת הרשימה הנפתחת
        renderSelectBar();

        // תצוגת פתיחה
        renderMainPreview();

        // הוספת מאזין לאירוע בחירה בתפריט
        addSelectListener();

        // הוספת מאזין לאירוע חיפוש
        addSearchListener();

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
    clearInput();

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


// הוספת מאזין לאירוע בחירה בתפריט
function addSelectListener() {

    const select = document.querySelector("#select_id");
    select.addEventListener("change", (event) => {
        clearScreen();
        clearInput();

        const selectedCountryName = event.target.value;

        // מציאת המדינה הנבחרת
        const selectedCountry = COUNTRIES.find(
            (country) => country.name.common === selectedCountryName
        );

        if (selectedCountry) {
            renderCountryCard(selectedCountry); // הצגת מידע על המדינה
        }
        else {
            alert("country not found")
        }
    });
}


// הוספת מאזין לחיפוש
function addSearchListener() {
    const searchInput = document.querySelector("#search_id");
    const src_btn = document.querySelector("#src_btn");
    const main_div = document.querySelector("#main_div");

    src_btn.addEventListener("click", () => {
        const searchValue = searchInput.value.toLowerCase();

        if (searchValue === "") {
            clearScreen();
            renderMainPreview();
            return;
        }

        clearScreen();; // מנקה את המסך

        // סינון המדינות לפי חיפוש שמתחיל עם שם המדינה
        const filteredCountries = COUNTRIES.filter((country) =>
            country.name.common.toLowerCase().startsWith(searchValue)
        );

        if (filteredCountries.length > 0) {
            // עדכון המדינות המוצגות
            activeCountries = [...filteredCountries];
            handleSortChange(); // עדכון המיון
            renderCountries(activeCountries); // תצוגה מחדש
        } else {
            // אם לא נמצאו מדינות
            main_div.innerHTML = "<p>No countries match your search.</p>";
        }

    });
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
