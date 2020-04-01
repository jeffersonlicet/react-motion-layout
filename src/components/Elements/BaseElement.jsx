import React, { useContext, useMemo, useCallback, useRef } from 'react';

import computeStyles from '../../utils/computeStyles';

import actions from '../../state/actions';

import GlobalContext from '../../utils/globalContext';
import { SceneContext } from '../MotionScene';
import { ScreenContext } from '../MotionScreen';

/**
 * Computes styles and adds the element to te animation stack
 */
export default function BaseElement({
  animationKey, children, settings, type,
}) {
  const mounted = useRef(false);
  const { sceneName, easing } = useContext(SceneContext);
  const { dispatch, store } = useContext(GlobalContext) || {};
  const { screenName } = useContext(ScreenContext);

  const isRegistered = useMemo(() => (
    store && store.exitView === sceneName
      && store.scenes[sceneName]
      && store.scenes[sceneName].sources[animationKey]
  ), [animationKey, sceneName, store]);

  const attachRef = useCallback((ref) => {
    if (ref && !mounted.current) {
      mounted.current = true;

      if (!animationKey) {
        console.warn('No animation key provided for component', children, 'it will be skipped');
        return;
      }

      if (!sceneName) {
        console.warn('Skipping SharedElement registration, MotionScene is invalid');
        return;
      }

      const actionType = isRegistered ? actions.view.registerTarget : actions.view.registerSource;
      const { width, height, x, y } = ref.getBoundingClientRect();

      const component = {
        ref,
        rect: { width, height, x, y },
        styles: computeStyles(type, ref, settings),
        component: children,
        type,
        settings,
      };

      dispatch({
        type: actionType,
        animationKey,
        component,
        sceneName,
        screenName,
      });
    }
  }, [animationKey, sceneName, settings, isRegistered, type, children, dispatch, screenName]);

  return React.cloneElement(children, { ...children.props, ref: attachRef, easing });
}
