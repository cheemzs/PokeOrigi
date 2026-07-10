const myButton = document.getElementById("goBtn");
const myResult = document.getElementById("displayResults");

myButton.addEventListener("click", function() {
  const pokemonName = document.getElementById(cardName).value;
  const setName = document.getElementByIf(setName).value;
  myResult.innerHTML = "You searched for" + pokemonName + "from set" + setName + "."
})
