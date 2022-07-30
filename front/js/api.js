const base_url = "http://localhost:3000/api/products/";

export async function getProducts() {
  const response = await fetch(base_url);
  let data = await response.json();
  return data;
}

export async function getProductData(id) {
  const response = await fetch(base_url + id);
  var data = await response.json();

  return data;
}
