const myButton = document.getElementById("goBtn");
const myResult = document.getElementById("displayResult");

myButton.addEventListener("click", async function() {
  try{
    const pokemonName = document.getElementById("cardName").value;
    const setName = document.getElementById("setName").value;
    myResult.innerHTML = "Searching Database...";
    const searchUrl = `/api/get-cards?search=${encodeURIComponent(pokemonName)}&set=${encodeURIComponent(setName)}&limit=5`;
    const currencyUrl = "https://v6.exchangerate-api.com/v6/9b52bd9f58a7572350a7fdc7/latest/USD";
    const exchange_data = await fetch(currencyUrl);
    const exchange_rate = await exchange_data.json();
    const rates_dict = exchange_rate.conversion_rates||{};
    const USD_to_SGD = rates_dict.SGD||"1.34";
    const cardresults = await fetch(searchUrl);
    const data = await cardresults.json();
    const cardsList = data.data||[];
    let htmlContent = `
      <div style="text-align: center; font-family: monospace;">
        <h3>========================================</h3>
        <h3>Search Results</h3>
        <h3>========================================</h3>
      </div>
    `;
    cardsList.forEach(card => {
      const cardName = card.name|| "Unknown";
      const cardSetName = card.setName|| "Unknown";
      const rarity = card.rarity|| "N.A";
      const prices = card.prices|| {};
      const marketPrice = prices.market;
      let price_display = "N.A";
      if (marketPrice) {
        const final_price = marketPrice * USD_to_SGD
        price_display = `$${final_price.toFixed(2)} SGD`
      }
      htmlContent += `
        <div style="text-align: center; margin: 20px 0; font-family: monospace;">
          <p><strong>Card:</strong> ${cardName}</p>
          <p><strong>Set:</strong> ${cardSetName}</p>
          <p><strong>Rarity:</strong> ${rarity}</p>
          <p><strong>Price:</strong> ${price_display}</p>
          <p>----------------------------------------</p>
        </div>
      `;
    });
    myResult.innerHTML = htmlContent;
  } catch (error) {
                            console.error("Something went wrong, please try again.", error)
  }
})
