export function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) return [];
  else return JSON.parse(cart);
}

export function saveCart(product) {
  localStorage.setItem("cart", JSON.stringify(product));
}

function isInTheCart(product_id, cart) {
  var results = cart.filter((x) => x.id === product_id);
  if (results.length != 0) return true;
  else return false;
}

function getProductInCart(product_id, cart) {
  let allProductInCartWithCurrentId = cart.filter((x) => x.id === product_id);
  return allProductInCartWithCurrentId[0];
}

export function addToCart(product_id, color_selected, quantity) {
  let cart = getCart();
  const product_color = color_selected.value;
  const product_quantity = quantity.value;

  if (isInTheCart(product_id, cart)) {
    let inCartProduct = getProductInCart(product_id, cart);
    const inCartProduct_colors = inCartProduct.colors;

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
