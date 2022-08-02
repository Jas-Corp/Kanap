import {
  getCart,
  removeFromCart,
  changeQuantityOfProduct,
} from "./cartManager.js";
import {
  StringToNode,
  checkEmailValidity,
  checkNameValidity,
  checkFirstNameValidity,
  checkAdressValidity,
  checkCityValidity,
} from "./utils.js";
import { getProductData } from "./api.js";

let cart = getCart();
let products_html = "";
let total_price = 0;
let total_articles = 0;

//Construit la liste des produits dans le panier.
const buildProductList = cart.map(async (product) => {
  const PRODUCT_DATA = await getProductData(product.id);
  const PRODUCT_COLORS = Object.keys(product.colors);

  PRODUCT_COLORS.map((color) => {
    let quantity = product.colors[color];
    total_price += PRODUCT_DATA.price * quantity;
    total_articles += quantity;

    products_html += `<article class="cart__item" data-id="${product.id}" data-color="${color}">
    <div class="cart__item__img">
      <img src="${PRODUCT_DATA.imageUrl}" alt="${PRODUCT_DATA.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${PRODUCT_DATA.name}</h2>
        <p>${color}</p>
        <p>${PRODUCT_DATA.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" data-id="${product.id}" data-color="${color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product.id}" data-color="${color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  });
});

//Charger les produits du cart dans le visuel de la page.
async function loadCart() {
  await Promise.all(buildProductList);
  let cart_items = document.querySelector("#cart__items");
  cart_items.appendChild(StringToNode(products_html));
  document.querySelector("#totalPrice").appendChild(StringToNode(total_price));
  document
    .querySelector("#totalQuantity")
    .appendChild(StringToNode(total_articles));

  removeCartProduct();
  changeCartProductQuantity();
}

//Supprimer un produit dans le visuel de la page
const removeCartProduct = () => {
  let buttons = document.getElementsByClassName("deleteItem");

  for (let button of buttons) {
    button.onclick = () => {
      let product_id = button.getAttribute("data-id");
      let product_color = button.getAttribute("data-color");
      let cart_items = document.querySelector("#cart__items");

      removeFromCart(product_id, product_color);
      cart_items.removeChild(
        document.querySelectorAll(`[data-id="${product_id}"]`)[0]
      );
      chaneTotalPriceAndQuantity();
    };
  }
};

//Changer la quantité d'un produit dans le cart du local storage.
const changeCartProductQuantity = () => {
  let value_input = document.getElementsByClassName("itemQuantity");

  for (let input of value_input) {
    input.addEventListener("change", () => {
      let product_id = input.getAttribute("data-id");
      let product_color = input.getAttribute("data-color");
      if (input.value > 100) input.value = 100;
      changeQuantityOfProduct(product_id, product_color, +input.value);
      chaneTotalPriceAndQuantity(product_id, +input.value);
    });
  }
};

//Change le prix et la quantité total affiché.
async function chaneTotalPriceAndQuantity() {
  let cart = getCart();
  let total_Quantity = 0;
  let total = cart.reduce(async (acc, product) => {
    let product_data = await getProductData(product.id);
    let price = product_data.price;
    const PRODUCT_COLORS = Object.keys(product.colors);
    PRODUCT_COLORS.map((color) => {
      total_Quantity += product.colors[color];
      price = product.colors[color] * price;
    });

    return price + (await acc);
  }, 0);

  let totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML = await total;
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = total_Quantity;
}

checkFirstNameValidity(
  document.getElementById("firstName"),
  document.getElementById("firstNameErrorMsg")
);
checkNameValidity(
  document.getElementById("lastName"),
  document.getElementById("lastNameErrorMsg")
);
checkAdressValidity(
  document.getElementById("address"),
  document.getElementById("addressErrorMsg")
);
checkCityValidity(
  document.getElementById("city"),
  document.getElementById("cityErrorMsg")
);
console.log(checkEmailValidity(
  document.getElementById("email"),
  document.getElementById("emailErrorMsg")
));

loadCart();
