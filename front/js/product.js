import { getCurrentUrlId, StringToNode } from "./utils.js";
import { getProductData } from "./api.js";
import { addToCart } from "./cartManager.js";

// BUILD THE COLOR INPUT
function buildColorList(product) {
  let colorList = "";
  product.colors.forEach((color) => {
    colorList += `<option value="${color}">${color}</option>`;
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
  const product = await getProductData(getCurrentUrlId());
  loadColor(product);
  loadImage(product);
  loadText(product);
}

function checkIfEnterIsCorrect() {
  if (color_selected.selectedIndex == 0 || quantity.value == 0)
    document
      .querySelector(".item__content__addButton")
      .classList.remove("isgood");
  else
    document.querySelector(".item__content__addButton").classList.add("isgood");
}

const color_selected = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

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
