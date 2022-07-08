const base_url = "http://localhost:3000/api/products/";
const products = document.getElementById("items");
window.localStorage.setItem("t", "COUCOU");

async function getProducts(url) {
  const response = await fetch(url);
  var data = await response.json();
  return data;
}

function buildProductList(canapes) {
  var productlist = "";

  canapes.forEach((canape) => {
    productlist +=
      '<a href="./product.html?id=' +
      canape._id +
      '"> <article> <img src="' +
      canape.imageUrl +
      '" alt="' +
      canape.altTxt +
      '> <h3 class="productName">' +
      canape.name +
      '</h3> <p class="productDescription">' +
      canape.description +
      "</p> </article> </a>";
  });

  return productlist;
}

async function loadProducts() {
  const canapes = await getProducts(base_url);
  products.innerHTML = buildProductList(canapes);
}

loadProducts();
