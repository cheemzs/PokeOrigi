const myButton = document.getElementById("goBtn");
const myResult = document.getElementById("displayResult");

myButton.addEventListener("click", async function() {
  const pokemonName = document.getElementById("cardName").value;
  const setName = document.getElementById("setName").value;
  myResult.innerHTML = "Searching Database...";
  const url = `https://api.pokemontcg.io/v2/cards?q=name:"${pokemonName}" set.name:"${setName}"`
})
