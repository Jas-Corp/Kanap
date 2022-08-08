const emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
  "g"
);
const nameRegxp = new RegExp("^[A-Za-zs]+$", "gm");

let emailIsValid = false;

export function checkEmailValidity(input, err) {
  input.addEventListener("change", () => {
    if (emailRegExp.test(input.value)) {
      err.innerHTML = "";
      emailIsValid = true;
    } else {
      err.innerHTML = "Veuillez entrer un email valide";
      emailIsValid = false;
    }
  });
}

let firstnameIsValid = false;

export function checkFirstNameValidity(input, err) {
  input.addEventListener("change", () => {
    if (nameRegxp.test(input.value.trim()) && input.value.trim().length >= 3) {
      err.innerHTML = "";
      firstnameIsValid = true;
    } else {
      err.innerHTML = "Veuillez entrer un prénom valide";
      firstnameIsValid = false;
    }
  });
}

let nameIsValid = false;
export function checkNameValidity(input, err) {
  input.addEventListener("change", () => {
    if (nameRegxp.test(input.value.trim()) && input.value.trim().length >= 3) {
      err.innerHTML = "";
      nameIsValid = true;
    } else {
      err.innerHTML = "Veuillez entrer un nom valide";
      nameIsValid = false;
    }
  });
}

let cityIsValid = false;
export function checkCityValidity(input, err) {
  input.addEventListener("change", () => {
    if (input.value.trim().length >= 5) {
      err.innerHTML = "";
      cityIsValid = true;
    } else {
      err.innerHTML = "Veuillez entrer une ville valide";
      cityIsValid = false;
    }
  });
}

let adressIsValid = false;
export function checkAdressValidity(input, err) {
  input.addEventListener("change", () => {
    if (input.value.trim().length >= 5) {
      err.innerHTML = "";
      adressIsValid = true;
    } else {
      err.innerHTML = "Veuillez entrer une adresse valide";
      adressIsValid = false;
    }
  });
}

export const allFormInputIsValids = () =>
  emailIsValid &&
  firstnameIsValid &&
  nameIsValid &&
  cityIsValid &&
  adressIsValid;
