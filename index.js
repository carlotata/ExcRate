let displayAPI = document.getElementById("dataDisplay");
let fetchDataButton = document.getElementById("fetchData");
let closeButton = document.getElementById("closeFetch");
let currency1Dropdown = document.getElementById("currency1");
let currency2Dropdown = document.getElementById("currency2");

fetchDataButton.hidden = false;
closeButton.hidden = true;

// Function to fetch and populate currencies dynamically
async function populateCurrencies() {
   try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();
      const currencies = Object.keys(data.rates);

      // Populate both dropdowns with currencies
      currencies.forEach((currency) => {
         const option1 = document.createElement("option");
         const option2 = document.createElement("option");
         option1.value = currency;
         option1.textContent = currency;

         option2.value = currency;
         option2.textContent = currency;

         currency1Dropdown.appendChild(option1);
         currency2Dropdown.appendChild(option2);
      });
   } catch (error) {
      displayAPI.innerText = "Error fetching currencies.";
   }
}

// Fetch and populate currencies when the page loads
populateCurrencies();

async function fetchData() {
   fetchDataButton.hidden = true;
   closeButton.hidden = false;

   const currency1 = currency1Dropdown.value;
   const currency2 = currency2Dropdown.value;

   currency1Dropdown.disabled = true;
   currency2Dropdown.disabled = true;

   try {
      const response = await fetch(
         `https://open.er-api.com/v6/latest/${currency1}`
      );

      const data = await response.json();
      const exchangeRate = data.rates[currency2];

      if (exchangeRate) {
         displayAPI.innerText = `1 ${currency1} = ${exchangeRate} ${currency2}`;
      } else {
         displayAPI.innerText = "Exchange rate not found.";
      }
   } catch (error) {
      displayAPI.innerText = "Input not found.";
   }
}

function closeFetch() {
   fetchDataButton.hidden = false;
   closeButton.hidden = true;
   displayAPI.innerText = "";
   currency1Dropdown.value = "";
   currency2Dropdown.value = "";

   currency1Dropdown.disabled = false;
   currency2Dropdown.disabled = false;
}
