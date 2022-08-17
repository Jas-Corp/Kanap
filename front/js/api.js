const BASE_URL = "http://localhost:3000/api/products/";

// Récupérer les produits stockés en base de données
export async function getProducts() {
  try {
    const response = await fetch(BASE_URL);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Récupérer un produits stockés en base de données a partir de sont id
export async function getProductData(id) {
  const response = await fetch(BASE_URL + id);
  if (response.status == 404) throw Error("Product is not found.");
  var data = await response.json();
  return data;
}

export async function sendOrder(formData, products) {
  const response = await fetch(BASE_URL + "order", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ contact: formData, products: products }),
  });

  const result = await response.json();
  return result;
}
