//Transforme un string en node.
export function StringToNode(string) {
  return document.createRange().createContextualFragment(string);
}

//Recuperer l'id contenu dans le lien actuel.
export function getCurrentUrlId() {
  const URL = window.location.href;
  const ID = URL.substring(URL.lastIndexOf("=") + 1);
  return ID;
}

export function checkEmailValidity(input, err) {
  input.addEventListener("focusout", () => {
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g"
    );

    if (emailRegExp.test(input.value)) {
      err.innerHTML = "";
    } else {
      err.innerHTML = "Veuillez entre un email valide";
    }
  });
}

export function checkFirstNameValidity(input, err) {
  input.addEventListener("focusout", () => {
    let nameRegxp = new RegExp("^[A-Za-zs]+$", "gm");

    if (nameRegxp.test(input.value.trim()) && input.value.trim().length >= 3) {
      err.innerHTML = "";
    } else {
      err.innerHTML = "Veuillez entre un prénom valide";
    }
  });
}

export function checkNameValidity(input, err) {
  input.addEventListener("focusout", () => {
    let nameRegxp = new RegExp("^[A-Za-zs]+$", "gm");

    if (nameRegxp.test(input.value.trim()) && input.value.trim().length >= 3) {
      err.innerHTML = "";
    } else {
      err.innerHTML = "Veuillez entre un nom valide";
    }
  });
}

export function checkCityValidity(input, err) {
  input.addEventListener("focusout", () => {
    if (input.value.trim().length >= 5) {
      err.innerHTML = "";
    } else {
      err.innerHTML = "Veuillez entre une ville valide";
    }
  });
}

export function checkAdressValidity(input, err) {
  input.addEventListener("focusout", () => {
    if (input.value.trim().length >= 5) {
      err.innerHTML = "";
    } else {
      err.innerHTML = "Veuillez entre une adresse valide";
    }
  });
}
