//Récupérer le cart stocké dans le local storage
export function getCart() {
  const CART = localStorage.getItem("cart");
  return CART == null ? [] : JSON.parse(CART);
  // if (CART == null) return [];
  // else return JSON.parse(CART);
}

//Sauvegarde l'objet json cart dans le local storage.
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Récuperer un produit a partir de son id dans le cart
function getProductInCart(product_id, cart) {
  return cart.find((x) => x.id === product_id);
}

//Ajouter dans le cart un produit ( Couleur et quantité )
export function addToCart(product_id, color_selected, quantity) {
  let cart = getCart();
  let product_color = color_selected.value;
  let product_quantity = quantity.value;

  let inCartProduct = getProductInCart(product_id, cart);
  if (inCartProduct) {
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

  let inCartProduct = getProductInCart(product_id, cart);
  if (inCartProduct) {
    
    let inCartProduct_colors = inCartProduct.colors;

    if (inCartProduct_colors.hasOwnProperty(color))
      delete inCartProduct_colors[color];

    if (Object.keys(inCartProduct_colors).length == 0)
      cart.splice(cart.indexOf(inCartProduct), 1);
  }
  saveCart(cart);
}

//Changer la quantité d'un produit dans le cart selon son id et sa couleur
export function changeQuantityOfProduct(product_id, color, quantity) {
  let cart = getCart();
  let inCartProduct = getProductInCart(product_id, cart);
  if (inCartProduct) {
    let inCartProduct_colors = inCartProduct.colors;

    if (inCartProduct_colors.hasOwnProperty(color)) {
      inCartProduct_colors[color] = quantity;
    }
  }
  saveCart(cart);
}
