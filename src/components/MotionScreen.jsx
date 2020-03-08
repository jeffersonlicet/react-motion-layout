import React from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from './MotionProvider';
import actions from '../state/actions';

export const ScreenContext = React.createContext();

export default class MotionScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { dispatch } = context;
    dispatch({ type: actions.view.setScreen, screen: props.name });
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { store, dispatch } = this.context;

    /*
    const num = Object.keys(store.views)
      .reduce((acc, view) => {
        const { screenName } = store.views[view];
        acc[screenName] = [...(acc[screenName] || []), view];
        return acc;
      }, {});

    console.log(num);
    if (num[name].length === 1) {
      console.log('here we should set as active the only one');
      dispatch({
        type: actions.view.setExitView,
        viewName: num[name][0],
      });
    }
    */
  }

  render() {
    const { name, children } = this.props;
    return (
      <ScreenContext.Provider value={{ screenName: name }}>
        {children}
      </ScreenContext.Provider>
    );
  }
}

MotionScreen.contextType = GlobalContext;

MotionScreen.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
