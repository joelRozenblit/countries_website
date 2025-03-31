import { getAllCountries } from "./api.js"


// API - קבלת הנתונים מה
const COUNTRIES = await getAllCountries();
// ---------------------
const COUNTRY_MAP = new Map(COUNTRIES.map(country => [country.cca3, country]));
const MAIN_DIV = document.querySelector("#main_div");
const INPUT = document.querySelector("#search_input");
const DROP_DOWN_MENU = document.querySelector("#dropdown_menu");
const RESULT_DIV = document.querySelector("#result");
const SORT_DIV = document.querySelector("#sort_div");
const CARD_CON = document.querySelector("#card-container");
const MAP_CON = document.querySelector("#map-container");
const FLAG_CON = document.querySelector("#flag-con");
const DETAILS_CON = document.querySelector("#details-con");
const PREVIEW_CON = document.querySelector("#preview-con");


export { COUNTRIES, COUNTRY_MAP, MAIN_DIV, INPUT, DROP_DOWN_MENU, RESULT_DIV, SORT_DIV, CARD_CON, MAP_CON, FLAG_CON, DETAILS_CON, PREVIEW_CON }