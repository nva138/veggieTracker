export async function searchFood(query) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${query}&json=1&fields=product_name,nutriments`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
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
    throw error;
  }
}
