import { getCart, removeFromCart, changeQuantity } from "./cartManager.js";
import { StringToNode } from "./utils.js";
import { getProductData } from "./api.js";

let cart = getCart();
let products_html = "";
let total_price = 0;

//Construit la liste des produits dans le panier.
const buildProductList = cart.map(async (product) => {
  const PRODUCT_DATA = await getProductData(product.id);
  const PRODUCT_COLORS = Object.keys(product.colors);

  PRODUCT_COLORS.map((color) => {
    let quantity = product.colors[color];
    total_price += PRODUCT_DATA.price * quantity;

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

  removeCartProduct();
  changeCartProductQuantity();
}

//Supprimer un produit dans le visuel de la page
const removeCartProduct = () => {
  let buttons = document.getElementsByClassName("deleteItem");

  for (let button of buttons) {
    button.onclick = (e) => {
      let product_id = button.getAttribute("data-id");
      let product_color = button.getAttribute("data-color");
      let cart_items = document.querySelector("#cart__items");

      removeFromCart(product_id, product_color);
      cart_items.removeChild(
        document.querySelectorAll(`[data-id="${product_id}"]`)[0]
      );
      chaneTotalPrice();
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
      changeQuantity(product_id, product_color, input.value);
      chaneTotalPrice();
    });
  }
};

//Change le prix total affiché.
function chaneTotalPrice() {
  // TODO
}

loadCart();
