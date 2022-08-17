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


