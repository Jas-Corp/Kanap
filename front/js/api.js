const BASE_URL = "http://localhost:3000/api/products/";

// Récupérer les produits stockés en base de données
export async function getProducts() {
  const response = await fetch(BASE_URL);
  let data = await response.json();
  return data;
}

// Récupérer un produits stockés en base de données a partir de sont id
export async function getProductData(id) {
  const response = await fetch(BASE_URL + id);
  var data = await response.json();

  return data;
}
