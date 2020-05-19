import { useContext } from 'react';
import actions from '../state/actions';
import GlobalContext from '../utils/globalContext';

/*
  This hook provides a way of setting the originOfTransition
*/
export default function useMotion(sceneName) {
  const { dispatch, store } = useContext(GlobalContext) || {};
  function withTransition(callback) {
    return () => {
      if (!dispatch || !store) {
        return;
      }

      if (!store.scenes[sceneName]) {
        console.warn(`${sceneName} is not registered, maybe you have misspelled the MotionScene name?`);
        callback();
        return;
      }

      if (!store.onExit) {
        callback();
        return;
      }

      const { sources } = store.scenes[sceneName];

      dispatch({
        type: actions.view.setExitView,
        sceneName,
      });

      Object.keys(sources).forEach((animationKey) => {
        const { ref } = sources[animationKey];
        const rect = ref.getBoundingClientRect();

        // Prevent updating if the ref is not in the screen
        if (rect.width > 0 && rect.height > 0) {
          dispatch({
            type: actions.view.updateSourceRect,
            rect,
            sceneName,
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
