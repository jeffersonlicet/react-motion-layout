import { useContext } from 'react';
import actions from '../state/actions';
import GlobalContext from '../utils/globalContext';

/*
  This hook provides a way of setting the originOfTransition
*/
export default function useMotion(viewName) {
  const { dispatch, store } = useContext(GlobalContext) || {};
  function withTransition(callback) {
    return () => {
      if (!dispatch || !store) {
        return;
      }

      const { sources } = store.views[viewName];

      dispatch({
        type: actions.view.setExitView,
        viewName,
      });

      Object.keys(sources).forEach((animationKey) => {
        const { ref } = sources[animationKey];
        const rect = ref.getBoundingClientRect();
        // Prevent updating if the ref is not in the screen
        if (rect.width > 0 && rect.height > 0) {
          dispatch({
            type: actions.view.updateSourceRect,
            rect,
            viewName,
            animationKey,
          });
        }
      });

      if (callback) {
        callback();
      }
    };
  }
  return withTransition;
}
