import { useContext, useCallback } from 'react';
import actions from '../state/actions';
import { GlobalContext } from '../components/MotionProvider';

/*
  This hook provides a way of setting the originOfTransition
*/
export default function useMotion(viewName) {
  const { dispatch, store } = useContext(GlobalContext);
  console.log(store);
  function withTransition(callback) {
    return () => {
      const { sources } = store.views[viewName];

      dispatch({
        type: actions.view.setExitView,
        viewName,
      });

      Object.keys(sources).forEach((animationKey) => {
        const { ref } = sources[animationKey];
        dispatch({
          type: actions.view.updateSourceRect,
          rect: ref.getBoundingClientRect(),
          viewName,
          animationKey,
        });
      });

      if (callback) {
        callback();
      }
    };
  }
  return [withTransition];
}
