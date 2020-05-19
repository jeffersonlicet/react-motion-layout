import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';

import ReactDOM from 'react-dom';
import actions from '../state/actions';

import { ScreenContext } from './MotionScreen';
import GlobalContext from '../utils/globalContext';

export default function RenderTarget({ name, children, onClick, easing }) {
  const mounted = useRef(false);
  const animatedComponentsCount = useRef(0);
  const animated = useRef(false);
  const ref = useRef(null);

  const { screenName, onExit, onEnter } = useContext(ScreenContext);
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

  /**
   * Clear all scenes, switch back to SourceMode and clear portal
   */
  const cleanUp = useCallback(() => {
    Object.keys(sources).forEach((animationKey) => {
      dispatch({
        type: actions.view.deleteTarget,
        sceneName: name,
        animationKey,
      });

      dispatch({
        type: actions.view.deleteSource,
        sceneName: name,
        animationKey,
      });

      const target = targets[animationKey];
      target.ref.style.opacity = 1;

      dispatch({
        type: actions.view.registerSource,
        component: target,
        sceneName: name,
        animationKey,
        screenName,
      });
    });

    if (onExit) {
      dispatch({ type: actions.view.clearScenes, keep: screenName });
    } else {
      dispatch({ type: actions.view.setExitView, exitView: null });
    }

    ReactDOM.render(null, portal);
  }, [dispatch, name, portal, screenName, sources, targets, onExit]);

  /**
   * If the animations are all done, we reset the animation stack
   */
  const onAnimationComplete = useCallback(() => {
    animatedComponentsCount.current += 1;

    if (animatedComponentsCount.current === Object.keys(sources).length && mounted) {
      cleanUp();
    }
  }, [cleanUp, sources]);

  const tween = useCallback(() => {
    if (!onEnter) {
      cleanUp();
      return;
    }

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
        top: 0,
        left: 0,
        bottom: 0,
        position: 'absolute',
        pointerEvents: 'none',
        marginTop: '0px !important',
        marginLeft: '0px !important',
        marginRight: '0px !important',
        marginBottom: '0px !important',
      };

      target.ref.style.opacity = 0;

      // TODO: define and spread those props using type.
      const props = {
        style,
        tween: {
          start: {
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            transform: `translate3d(${points.source.x}px, ${points.source.y}px, 0)`,
            fontSize: styles.fontSize,
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            background: styles.background,
            boxShadow: styles.boxShadow,
            borderRadius: styles.borderRadius,
          },
          end: {
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`,
            transform: `translate3d(${points.dest.x}px, ${points.dest.y}px, 0)`,
            fontSize: target.styles.fontSize,
            color: target.styles.color,
            background: target.styles.background,
            backgroundColor: target.styles.backgroundColor,
            boxShadow: target.styles.boxShadow,
            borderRadius: target.styles.borderRadius,
          },
        },
        animate: true,
        onAnimationComplete,
      };

      const finalProps = {
        ...props,
        easing,
        key,
        style: { ...source.component.props.style, ...props.style, ...props.tween.start },
      };

      return React.cloneElement(source.component, finalProps);
    });

    ReactDOM.render(AnimationComponents, portal);
  }, [sources, portal, targets, getPoints, onAnimationComplete, easing]);


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
  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = null;
    };
  }, [dispatch, name, portal]);

  return React.createElement('div', { ref, onClick }, children);
}
