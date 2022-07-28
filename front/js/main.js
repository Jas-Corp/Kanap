const base_url = "http://localhost:3000/api/products/";
const displayed_products = document.getElementById("items");

function StringToNode(string) {
  return document.createRange().createContextualFragment(string);
}

async function getProducts(url) {
  const response = await fetch(url);
  let data = await response.json();
  return data;
}

function buildProductList(products) {
  let productlist = "";

  products.forEach((product) => {
    productlist += `<a href="./product.html?id=${product._id}"> 
      <article> <img src="${product.imageUrl}" alt="${product.altTxt}"> 
        <h3 class="productName">${product.name}</h3> 
        <p class="productDescription">${product.description}</p> 
      </article> 
    </a>`;
  });

  return productlist;
}

async function loadProducts() {
  const products = await getProducts(base_url);
  displayed_products.appendChild(StringToNode(buildProductList(products)));
}

loadProducts();
