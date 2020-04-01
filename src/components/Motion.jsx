import React, { useRef, useEffect, useCallback, useState } from 'react';

import keyframes from '../utils/keyframes';
import { componentTypes } from '../utils/constants';

const DEFAULT_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Runs tween animation on MotionScene childrens
 */
export default function Motion({
  animate, type, handleRef, tween, onAnimationComplete, easing, ...props
}) {
  const animated = useRef(false);
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

      const animation = reference.animate([
        start,
        end,
      ], {
        easing: easing || DEFAULT_EASING,
        duration: 400,
        fill: 'forwards',
      });

      animation.pause();

      animation.onfinish = () => {
        onAnimationComplete();
      };

      animation.play();
    }
  }, [animate, animated, tween, reference, onAnimationComplete, type, easing]);

  switch (type) {
    case componentTypes.image:
      return <img ref={attachRef} {...props} />;
    case componentTypes.text:
    case componentTypes.div:
      return <div ref={attachRef} {...props} />;
    default:
      return null;
  }
}
