import { getProducts } from "./api.js";
import { StringToNode } from "./utils.js";

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
  const products_section = document.getElementById("items");
  const products = await getProducts();
  products_section.appendChild(StringToNode(buildProductList(products)));
}

loadProducts();
