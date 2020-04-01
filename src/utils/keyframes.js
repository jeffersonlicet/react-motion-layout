import { componentTypes } from './constants';

function extractKeyframes(type, params) {
  const {
    fontSize, color, width, height, transform, backgroundColor, background, boxShadow, borderRadius,
  } = params;

  const common = {
    width,
    height,
    transform,
  };

  switch (type) {
    case componentTypes.text:
      return {
        ...common,
        ...(fontSize ? { fontSize } : {}),
        ...(color ? { color } : {}),
      };
    case componentTypes.div:
      return {
        ...common,
        ...(background ? { background } : {}),
        ...(backgroundColor ? { backgroundColor } : {}),
        ...(boxShadow ? { boxShadow } : {}),
        ...(borderRadius ? { borderRadius } : {}),
      };
    case componentTypes.image:
      return {
        ...common,
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
