const sCountry = document.getElementById("fcountry");
const myButton = document.getElementById("getinfo");
const lCapital = document.getElementById("Capital-label");
const lPopulation = document.getElementById("Population-label");
const lRegion = document.getElementById("Region-label");
const pCountry = document.getElementById("CountryName");
const fFlag = document.getElementById("flag");

const neighborsList = document.getElementById("neighbors-list");


function fetchBorderingCountries(borderCodes) {
    if (!borderCodes || borderCodes.length === 0) {
        neighborsList.innerHTML = '<p>No bordering countries</p>';
        return;
    }

    const bordersUrl = `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(',')}`;
    fetch(bordersUrl)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch borders');
            return response.json();
        })
        .then(data => {
            neighborsList.innerHTML = ''; // Clear previous data
            data.forEach(country => {
                const div = document.createElement('div');
                div.className = 'neighbor-item';
                div.innerHTML = `
                    <section>${country.name.common}</section>
                    <img src="${country.flags.svg}" alt="${country.name.common} flag" width="80">
                `;
                neighborsList.appendChild(div);
            });
        })
        .catch(err => console.error(error));
}

myButton.addEventListener('click', function() {

    const cName = sCountry.value.trim();
    if (!cName) return;

    const sUrl = `https://restcountries.com/v3.1/name/${cName}?fullText=true`;
    fetch(sUrl)
        .then(response => {
            if (!response.ok) throw new Error('Country not found');
            return response.json();
        })
        .then(data => {
            const country = data[0];
            pCountry.textContent = country.name.common;
            lCapital.textContent = `Capital: ${country.capital?.[0] || 'N/A'}`;
            lPopulation.textContent = `Population: ${country.population.toLocaleString()}`;
            lRegion.textContent = `Region: ${country.region}`;
            fFlag.src = country.flags.svg;
            fFlag.alt = `${country.name.common} flag`;

            fetchBorderingCountries(country.borders);
        })
        .catch(err => console.error(error));
});