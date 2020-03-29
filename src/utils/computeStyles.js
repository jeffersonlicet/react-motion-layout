export default function computeStyles(DOMElement, settings) {
  let fontSize;
  let color;

  const computedStyle = window.getComputedStyle(DOMElement, null);

  if (settings.animateSize) {
    fontSize = `${parseFloat(computedStyle.getPropertyValue('font-size'))}px`;
  }

  if (settings.animateColor) {
    color = computedStyle.getPropertyValue('color');
  }

  return { fontSize, color };
}
