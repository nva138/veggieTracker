const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

export async function searchFood(query) {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
