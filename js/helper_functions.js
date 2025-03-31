import { COUNTRIES, COUNTRY_MAP } from "./global_variables.js"



// יצירת מערך של 6 מדינות רנדומליות
function getRandomCountries(count = 5) {
    const indices = new Set();
    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * COUNTRIES.length));
    }
    return Array.from(indices).map(index => COUNTRIES[index]);
}


// חישוב זום רצוי למפה
function calculateZoom(area) {
    if (!area || isNaN(area)) return 6 // ערך ברירת מחדל אם אין נתון
    if (area < 5000) return 8; // מדינות קטנות
    if (area < 20000) return 7; // מדינות בינוניות
    if (area < 100000) return 6; // מדינות בינוניות-גדולות
    return 5; // מדינות גדולות
}


// קבלת מטבעות
function getCurrencies(country) {
    const c = country.currencies ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol || 'N/A'})`).join(", ") : "N/A";

    return c;
}


// קבלת שפות
function getLanguages(country) {
    const l = country.languages ? Object.values(country.languages).join(", ") : "N/A";

    return l;
}


// קבלת שכנים
function getNeighbours(country) {
    return (country.borders || []).map(border => COUNTRY_MAP.get(border)?.name.common || "Unknown");
}


// קבלנים קישורים לשכנים
function getNeighboursLinks(neighbours) {
    const n_l = neighbours.length > 0
    ? neighbours.map(country => {
            return `<a href="#" data-country="${country}" title="${country}">${country}</a>`;
        }).join(", ")
        : "no neighboring countries";

    return n_l;
}


export {
    getRandomCountries,
    getNeighboursLinks,
    getNeighbours,
    getLanguages,
    getCurrencies, 
    calculateZoom
}