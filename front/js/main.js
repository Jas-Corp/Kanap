import { getProducts } from "./api.js";
import { StringToNode } from "./utils.js";

// Construit la liste des produit en html a partir d'un json.
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

// Charge les produit dans le visuel de la page.
async function loadProducts() {
  const PRODUCTS = await getProducts();
  let products_section = document.getElementById("items");
  products_section.appendChild(StringToNode(buildProductList(PRODUCTS)));
}

loadProducts();
