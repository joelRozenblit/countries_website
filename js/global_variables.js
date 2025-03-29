import { getAllCountries } from "./api.js"


// API - קבלת הנתונים מה
const COUNTRIES = await getAllCountries();
// ---------------------
const COUNTRY_MAP = new Map(COUNTRIES.map(country => [country.cca3, country]));
const MAIN_DIV = document.querySelector("#main_div");
const INPUT = document.querySelector("#search_input");
const DROP_DOWN_MENU = document.querySelector("#dropdown_menu");
const RESULT_DIV = document.querySelector("#result");


export { COUNTRIES, COUNTRY_MAP, MAIN_DIV, INPUT, DROP_DOWN_MENU, RESULT_DIV }