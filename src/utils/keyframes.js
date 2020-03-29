import { componentTypes } from './constants';

function extractKeyframes(type, params) {
  const { fontSize, color, width, height, transform } = params;
  switch (type) {
    case componentTypes.text:
      return {
        width,
        height,
        transform,
        ...(fontSize ? { fontSize } : {}),
        ...(color ? { color } : {}),
      };
    case componentTypes.image:
      return {
        width,
        height,
        transform,
      };
    default:
      return {};
  }
}

export default function keyframes(type, tween) {
  return {
    start: extractKeyframes(type, tween.start),
    end: extractKeyframes(type, tween.end),
  };
}
