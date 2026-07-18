const myButton = document.getElementById("goBtn");
const myResult = document.getElementById("displayResult");

myButton.addEventListener("click", async function() {
  try{
    const pokemonName = document.getElementById("cardName").value;
    const setName = document.getElementById("setName").value;
    const languagechosen = document.getElementById("language").value;
    const lowlang = languagechosen.ToLowerCase()
    myResult.innerHTML = "Searching Database...";
    const searchUrl = `/api/get-cards?search=${encodeURIComponent(pokemonName)}&set=${encodeURIComponent(setName)}&language=${lowlang}&limit=5`;
    const currencyUrl = "https://v6.exchangerate-api.com/v6/9b52bd9f58a7572350a7fdc7/latest/USD";
    const exchange_data = await fetch(currencyUrl);
    const exchange_rate = await exchange_data.json();
    const rates_dict = exchange_rate.conversion_rates||{};
    const USD_to_SGD = rates_dict.SGD||"1.34";
    const cardresults = await fetch(searchUrl);
    const data = await cardresults.json();
    const cardsList = data.data||[];
    // Start of the results section layout
    let htmlContent = `
      <div class="results-header">
        <h2>Search Results</h2>
      </div>
      <div class="cards-grid">
    `;

    cardsList.forEach(card => {
      const cardName = card.name || "Unknown Name";
      const cardSetName = card.setName || "Unknown Set";
      const rarity = card.rarity || "N.A";
      const prices = card.prices || {};
      const marketPrice = prices.market;
      
      let price_display = "N.A";
      if (marketPrice) {
        const final_price = marketPrice * USD_to_SGD;
        price_display = `$${final_price.toFixed(2)} SGD`;
      }

      // Modern UI Grid Card Component
      htmlContent += `
        <div class="pokemon-card">
          <div class="card-title">${cardName}</div>
          
          <div class="card-info-row">
            <span class="info-label">Set</span>
            <span class="info-value">${cardSetName}</span>
          </div>
          
          <div class="card-info-row">
            <span class="info-label">Rarity</span>
            <span class="info-value badge">${rarity}</span>
          </div>

          <div class="card-info-row">
            <span class="info-label">Language</span>
            <span class="info-value language-thing>${language}</span>
          </div>
          
          <div class="card-info-row price-row">
            <span class="info-label">Market Price</span>
            <span class="info-value price-tag">${price_display}</span>
          </div>
        </div>
      `;
    });

    htmlContent += `</div>`; // Closes the cards-grid wrapper container
    myResult.innerHTML = htmlContent;
  } catch (error) {
                            console.error("Something went wrong, please try again.", error)
  }
})
