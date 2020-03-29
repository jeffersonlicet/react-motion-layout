import React, {
  useRef,
  useCallback,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';

import ReactDOM from 'react-dom';
import actions from '../state/actions';

import { ScreenContext } from './MotionScreen';
import GlobalContext from '../utils/globalContext';

export default function RenderTarget({ name, children, onClick, setAnimated }) {
  const mounted = useRef(false);
  const [animationsCounter, setCounter] = useState(0);
  const animated = useRef(false);
  const ref = useRef(null);

  const { screenName } = useContext(ScreenContext);
  const { store, dispatch, portal } = useContext(GlobalContext);

  const { sources, targets } = store.scenes[name];

  const getPoints = useCallback((sourceRect, targetRect) => ({
    source: {
      x: sourceRect.x + store.exitScroll.x,
      y: sourceRect.y + store.exitScroll.y,
    },
    dest: {
      x: targetRect.x + window.scrollX,
      y: targetRect.y + window.scrollY,
    },
  }), [store]);

  const cleanUp = useCallback(() => {
    Object.keys(store.scenes).forEach((view) => {
      if (store.scenes[view].screenName && store.scenes[view].screenName !== screenName) {
        dispatch({
          type: actions.view.remove,
          sceneName: view,
        });
      }
    });
    setAnimated(true);
    ReactDOM.render(null, portal);
  }, [dispatch, portal, screenName, setAnimated, store.scenes]);

  const tween = useCallback(() => {
    animated.current = true;

    ref.current.animate([
      { opacity: 0 },
      { opacity: 1 },
    ], {
      easing: 'linear',
      duration: 400,
      fill: 'forwards',
    });

    const AnimationComponents = Object.keys(sources).map((key) => {
      const source = sources[key];
      const target = targets[key];

      const { rect, styles } = source;
      const targetRect = target.ref.getBoundingClientRect();

      const points = getPoints(rect, targetRect);

      const style = {
        marginTop: '0px !important',
        marginLeft: '0px !important',
        marginBottom: '0px !important',
        marginRight: '0px !important',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        pointerEvents: 'none',
      };

      target.ref.style.opacity = 0;

      const props = {
        style,
        tween: {
          start: {
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            transform: `translate3d(${points.source.x}px, ${points.source.y}px, 0)`,
            fontSize: styles.fontSize,
            color: styles.color,
          },
          end: {
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`,
            transform: `translate3d(${points.dest.x}px, ${points.dest.y}px, 0)`,
            fontSize: target.styles.fontSize,
            color: target.styles.color,
          },
        },
        animate: true,
        onAnimationComplete: () => {
          if (mounted.current) {
            setCounter(animationsCounter + 1);
          }
        },
      };

      const finalProps = {
        ...props,
        key,
        style: { ...source.component.props.style, ...props.style },
      };

      return React.cloneElement(source.component, finalProps);
    });

    ReactDOM.render(AnimationComponents, portal);
  }, [animationsCounter, getPoints, portal, sources, targets]);

  /**
   * If the animations are all done, we reset the animation stack
   */
  useEffect(() => {
    if (animationsCounter === Object.keys(sources).length - 1) {
      cleanUp();
    }
  }, [animationsCounter, sources, cleanUp]);

  /**
   * If all SharedElements are ready, dispatch the animation
   */
  useLayoutEffect(() => {
    mounted.current = true;
    if ((Object.keys(sources).length === Object.keys(targets).length)
      && !animated.current && ref.current) {
      tween();
    }
  }, [sources, targets, tween, animated]);

  /**
   * Track if the component is mounted
   */
  useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = null;
    };
  }, [portal]);

  return React.createElement('div', { ref, onClick }, children);
}
