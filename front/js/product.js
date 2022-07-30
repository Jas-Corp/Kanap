import { getCurrentUrlId, StringToNode } from "./utils.js";
import { getProductData } from "./api.js";
import { addToCart } from "./cartManager.js";

// Construit la liste des couleurs d'un produit en html a partir d'un json.
function buildColorList(product) {
  let colorList = "";
  product.colors.forEach((color) => {
    colorList += `<option value="${color}">${color}</option>`;
  });
  return colorList;
}

//Charger les couleurs d'un produit dnas le visuel de la page.
function loadColor(product) {
  let colors = document.getElementById("colors");
  colors.appendChild(StringToNode(buildColorList(product)));
}

//Charger l'images d'un produit dnas le visuel de la page.
function loadImage(product) {
  let img_div = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  img_div.appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;
}

//Charger les textes d'un produit dnas le visuel de la page.
function loadText(product) {
  let title_h1 = document.getElementById("title");
  let price_span = document.getElementById("price");
  let description_p = document.getElementById("description");

  document.title = product.name;
  price_span.appendChild(StringToNode(product.price));
  title_h1.appendChild(StringToNode(product.name));
  description_p.appendChild(StringToNode(product.description));
}

//Charger le produit dans le visuel de la page
async function loadProduct() {
  const PRODUCT = await getProductData(getCurrentUrlId());

  loadColor(PRODUCT);
  loadImage(PRODUCT);
  loadText(PRODUCT);
}

//Vérifier si les champs de selectino de couleur et quantité son correctement renseignée.
function checkIfEnterIsCorrect() {
  if (color_selected.selectedIndex == 0 || quantity.value == 0)
    document
      .querySelector(".item__content__addButton")
      .classList.remove("isgood");
  else
    document.querySelector(".item__content__addButton").classList.add("isgood");
}

let color_selected = document.querySelector("#colors");
let quantity = document.querySelector("#quantity");

color_selected.addEventListener("change", () => {
  checkIfEnterIsCorrect();
});
quantity.addEventListener("change", () => {
  checkIfEnterIsCorrect();
});

const addToCart_button = document.querySelector("#addToCart");

addToCart_button.onclick = async () => {
  if (
    document
      .querySelector(".item__content__addButton")
      .classList.contains("isgood")
  ) {
    addToCart(getCurrentUrlId(), color_selected, quantity);
  }
};

loadProduct();
