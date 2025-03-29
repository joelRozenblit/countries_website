const API_URL_ALL = "https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,languages,flags,population,latlng,borders,fifa,cca3,latlng,area,maps";


// פונקציה אסינכרונית לקבלת כל המדינות
async function getAllCountries() {
    try {
        const res = await fetch(API_URL_ALL);
        if (!res.ok) {
            throw new Error("Failed to fetch countries data");
        }
        const countries = await res.json();
        return countries.sort((a, b) => a.name.common.localeCompare(b.name.common)); // סידור חד-פעמי
    } catch (err) {
        console.error("Error fetching countries:", err);
        document.querySelector("#main_div").innerHTML = "<p class='text-danger'>Failed to load countries. Please check your connection or try again later.</p>";
        return [];
    }
}




// ייצוא הפונקציות
export { getAllCountries };

