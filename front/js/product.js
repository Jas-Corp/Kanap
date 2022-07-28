const base_url = "http://localhost:3000/api/products/";

function StringToNode(string) {
  return document.createRange().createContextualFragment(string);
}

function getCurrentUrlId() {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("=") + 1);
  return id;
}

// GET THE PRODUCT
async function getProductData(url) {
  const response = await fetch(url);
  var data = await response.json();

  return data;
}

function buildColorList(product) {
  let colorList = "";
  product.colors.forEach((color) => {
    colorList += '<option value="' + color + '">' + color + "</option>";
  });
  return colorList;
}
// LOAD THE PRODUCT
function loadColor(product) {
  const colors = document.getElementById("colors");
  colors.appendChild(StringToNode(buildColorList(product)));
}

function loadImage(product) {
  const img_div = document.querySelector(".item__img");
  var productImg = document.createElement("img");
  img_div.appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
}

function loadText(product) {
  const title_h1 = document.getElementById("title");
  const price_span = document.getElementById("price");
  const description_p = document.getElementById("description");

  document.title = product.name;
  price_span.appendChild(StringToNode(product.price));
  title_h1.appendChild(StringToNode(product.name));
  description_p.appendChild(StringToNode(product.description));
}

async function loadProduct() {
  const product = await getProductData(base_url + getCurrentUrlId());
  loadColor(product);
  loadImage(product);
  loadText(product);
}

const addToCart_button = document.querySelector("#addToCart");

addToCart_button.onclick = async (event) => {
  const color_selected = document.querySelector("#colors");
  const quantity = document.querySelector("#quantity");
  if (color_selected.selectedIndex == 0)
    alert("Vous devez choisir une couleur");
  else if (quantity.value == 0)
    alert("Vous devez choisir un nombre supérieur a 0");
  else {
    window.localStorage.setItem("canap", "107fb5b75607497b96722bda5b504926"); // TODO
  }
};

function addToCart() {}
loadProduct();
addToCart();
