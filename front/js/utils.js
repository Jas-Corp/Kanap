export function StringToNode(string) {
  return document.createRange().createContextualFragment(string);
}

export function getCurrentUrlId() {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("=") + 1);
  return id;
}
