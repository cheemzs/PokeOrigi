const myButton = document.getElementById("goBtn");
const myResult = document.getElementById("displayResult");

myButton.addEventListener("click", async function() {
  const pokemonName = document.getElementById("cardName").value;
  const setName = document.getElementById("setName").value;
  myResult.innerHTML = "Searching Database...";
  const url = "https://www.pokemonpricetracker.com/api/v2/cards";
  const searchUrl = `/api/get-cards?${url}?search=${encodeURIcomponent(pokemonName)}&set=${encodeURIcomponent(setName)}&limit=5`;
  const currencyUrl = "https://v6.exchangerate-api.com/v6/9b52bd9f58a7572350a7fdc7/latest/USD";
  const exchange_data = await fetch(currencyUrl);
  const exchange_rate = await exchange_data.json();
  const rates_dict = exchange_rate.conversion_rates||{};
  const USD_to_SGD = rates_dict.SGD||"1.34";
  const card results = await fetch(searchUrl);
})
