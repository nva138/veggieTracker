export async function searchFood(query) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?search_terms=${query}&fields=product_name,nutriments`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchByBarcode(query) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${query}.json`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
