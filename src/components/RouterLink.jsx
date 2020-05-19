import React, { useContext, useCallback } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';

import GlobalContext from '../utils/globalContext';
import actions from '../state/actions';

/**
 * Wraps a ReactRouterDom Link into a function that dispatches an animation
 * Only if there is only one scene in the current screen
 */
export default function RouterLink({ to, replace, className, target, style, children }) {
  const { store, dispatch } = useContext(GlobalContext);
  const history = useHistory();
  const location = useLocation();

  const onClick = useCallback((e) => {
    const destination = typeof to === 'function' ? to(location) : to;
    if (store.screen && store.onExit) {
      e.preventDefault();

      const method = replace ? history.replace : history.push;

      /**
       * Search for scenes and group by screen name
       */
      const num = Object.keys(store.scenes)
        .reduce((acc, view) => {
          const { screenName } = store.scenes[view];
          acc[screenName] = [...(acc[screenName] || []), view];
          return acc;
        }, {});

      if (num[store.screen] && num[store.screen].length === 1) {
        dispatch({
          type: actions.view.setExitView,
          sceneName: num[store.screen][0],
        });
      }

      method(destination);
    }
  }, [dispatch, history, location, replace, store.onExit, store.scenes, store.screen, to]);

  return (
    <Link
      to={to}
      style={style}
      target={target}
      replace={replace}
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}
