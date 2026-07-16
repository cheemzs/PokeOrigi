export default async function handler(request, response) {
  const MY_API_KEY = process.env.POKEPRICE_API_KEY;
  const userSearch = request.query.search;
  const userSet = request.query.set;
  const apiUrl = `https://www.pokemonpricetracker.com/api/v2/cards?search=${encodeURIComponent(userSearch)}&set=${encodeURIComponent(userSet)}&limit=5`;
  try {
    const apiResponse = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${MY_API_KEY}`
      }
    });
    const data = await apiResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({error: "Failed to fetch card data safely"});
  }
}
