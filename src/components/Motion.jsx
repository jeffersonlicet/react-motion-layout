import React, { useRef, useEffect, useCallback, useState } from 'react';

import keyframes from '../utils/keyframes';
import { componentTypes } from '../utils/constants';

/**
 * Runs tween animation on MotionScene childrens
 */
export default function Motion({
  animate, type, handleRef, tween, onAnimationComplete, ...props
}) {
  const animated = useRef(false);
  const timerReference = useRef(null);
  const [reference, setReference] = useState(null);

  const attachRef = useCallback((ref) => {
    if (handleRef) {
      handleRef(ref);
    }

    setReference(ref);
  }, [handleRef]);

  useEffect(() => {
    if (animate && !animated.current && reference) {
      animated.current = true;

      const { start, end } = keyframes(type, tween);

      timerReference.current = setTimeout(onAnimationComplete, 400);

      reference.animate([
        start,
        end,
      ], {
        easing: 'ease',
        duration: 400,
        fill: 'forwards',
      });
    }
  }, [animate, animated, tween, reference, onAnimationComplete, type]);

  useEffect(() => clearTimeout(timerReference.current), []);

  switch (type) {
    case componentTypes.image:
      return <img ref={attachRef} {...props} />;
    case componentTypes.text:
      return <div ref={attachRef} {...props} />;
    default:
      return null;
  }
}
