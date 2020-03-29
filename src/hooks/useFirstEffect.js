import { useLayoutEffect, useRef } from 'react';

export default function useFirstEffect(fn, deps) {
  const firstEffect = useRef(true);
  useLayoutEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false;
      fn();
    }
  }, [fn, ...deps]);
}
