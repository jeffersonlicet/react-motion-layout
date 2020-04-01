import { componentTypes } from './constants';

function computeTextStyles(DOMElement, settings) {
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

function computeDivStyles(DOMElement) {
  const computedStyle = window.getComputedStyle(DOMElement, null);
  const background = computedStyle.getPropertyValue('background');
  const backgroundColor = computedStyle.getPropertyValue('background-color');
  const boxShadow = computedStyle.getPropertyValue('box-shadow');
  const borderRadius = computedStyle.getPropertyValue('border-radius');
  return { backgroundColor, background, boxShadow, borderRadius };
}


export default function computeStyles(type, DOMElement, settings) {
  switch (type) {
    case componentTypes.text:
      return computeTextStyles(DOMElement, settings);
    case componentTypes.div:
      return computeDivStyles(DOMElement, settings);
    default:
      return {};
  }
}
