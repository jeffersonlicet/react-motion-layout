import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import actions from '../../state/actions';
import GlobalContext from '../../utils/globalContext';
import { ViewContext } from '../MotionScene';

export function ContextProvider({ children }) {
  const globalContext = useContext(GlobalContext);
  const viewContext = useContext(ViewContext);
  return children({ globalContext, viewContext });
}

export default class BaseElement extends React.Component {
  handleRef = (ref) => {
    const {
      animationKey, children, viewContext, globalContext, type, settings,
    } = this.props;

    if (!animationKey) {
      console.warn('No animation key provided for component', children, 'it will be skipped');
      return;
    }

    const { viewName } = viewContext;

    if (!viewName) {
      console.warn('Skipping SharedElement registration, MotionScene is invalid');
      return;
    }

    const { dispatch } = globalContext;

    if (ref) {
      const component = {
        ref,
        rect: ref.getBoundingClientRect(),
        component: children,
        type,
        settings,
      };

      const actionType = this.isComponentRegistered()
        ? actions.view.registerTarget
        : actions.view.registerSource;

      dispatch({
        type: actionType, component, viewName, animationKey,
      });
    }
  }

  isComponentRegistered = () => {
    const { globalContext, viewContext, animationKey } = this.props;
    const { store } = globalContext;
    const { viewName } = viewContext;
    return (
      store.exitView === viewName
      && store.views[viewName]
      && store.views[viewName].sources[animationKey]
    );
  }

  render() {
    const { children } = this.props;
    return React.cloneElement(children, { ref: this.handleRef, ...children.props });
  }
}

BaseElement.propTypes = {
  globalContext: PropTypes.shape({
    store: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  viewContext: PropTypes.shape({
    viewName: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  animationKey: PropTypes.string,
  settings: PropTypes.shape({}).isRequired,
};

BaseElement.defaultProps = {
  animationKey: null,
  viewContext: {
    viewName: null,
  },
};
