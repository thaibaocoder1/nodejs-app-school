export function setTextContent(parentElement, selector, text) {
  if (!parentElement) return;
  const element = parentElement.querySelector(selector);
  if (element) element.textContent = text;
  return element;
}
