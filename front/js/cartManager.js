//Récupérer le cart stocké dans le local storage
export function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) return [];
  else return JSON.parse(cart);
}

//Sauvegarde l'objet json cart dans le local storage.
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Vérifie a partir d'un id si le produit et présent dans un cart donné.
function isInTheCart(product_id, cart) {
  let cartProducts = cart.filter((x) => x.id === product_id);
  if (cartProducts.length != 0) return true;
  else return false;
}

//Récuperer un produit a partir de son id dans le cart
function getProductInCart(product_id, cart) {
  let allProductInCartWithCurrentId = cart.filter((x) => x.id === product_id);
  return allProductInCartWithCurrentId[0];
}

//Ajouter dans le cart un produit ( Couleur et quantité )
export function addToCart(product_id, color_selected, quantity) {
  let cart = getCart();
  let product_color = color_selected.value;
  let product_quantity = quantity.value;

  if (isInTheCart(product_id, cart)) {
    let inCartProduct = getProductInCart(product_id, cart);
    let inCartProduct_colors = inCartProduct.colors;

    if (inCartProduct_colors.hasOwnProperty(product_color)) {
      let totalQuantity =
        inCartProduct_colors[product_color] + parseInt(product_quantity);
      if (totalQuantity > 100) totalQuantity = 100;
      inCartProduct_colors[product_color] = totalQuantity;
    } else inCartProduct_colors[product_color] = parseInt(product_quantity);
  } else {
    let product = JSON.parse(
      `{"id":"${product_id}","colors":{"${product_color}":${product_quantity}}}`
    );

    cart.push(product);
  }

  saveCart(cart);
}

//Retirer un produit du cart selon son id et sa couleur
export function removeFromCart(product_id, color) {
  let cart = getCart();
  if (isInTheCart(product_id, cart)) {
    let inCartProduct = getProductInCart(product_id, cart);
    let inCartProduct_colors = inCartProduct.colors;

    if (inCartProduct_colors.hasOwnProperty(color)) {
      delete inCartProduct_colors[color];
      console.log(Object.keys(inCartProduct_colors).length);
      //   if (Object.keys(inCartProduct_colors).length == 0) {
      //     delete cart[inCartProduct];
      //   }
      //TODO DELETE TOTALY
    }
  }
  saveCart(cart);
}

//Changer la quantité d'un produit dans le cart selon son id et sa couleur
export function changeQuantity(product_id, color, quantity) {
  let cart = getCart();
  if (isInTheCart(product_id, cart)) {
    let inCartProduct = getProductInCart(product_id, cart);
    let inCartProduct_colors = inCartProduct.colors;

    if (inCartProduct_colors.hasOwnProperty(color)) {
      inCartProduct_colors[color] = quantity;
    }
  }
  saveCart(cart);
}
