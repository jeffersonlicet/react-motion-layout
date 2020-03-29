import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../utils/globalContext';
import actions from '../state/actions';

export const ScreenContext = React.createContext();

function randomString() {
  return Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5);
}

export default class MotionScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { name } = props;

    this.state = {
      name: name || randomString(),
    };
  }

  componentDidMount() {
    const { dispatch } = this.context;
    const { name } = this.state;
    dispatch({ type: actions.view.setScreen, screen: name });
  }

  componentWillUnmount() {
    const { dispatch } = this.context;
    const exitScroll = { x: window.scrollX, y: window.scrollY };
    dispatch({ type: actions.view.setExitScroll, exitScroll });
  }

  render() {
    const { children } = this.props;
    const { name } = this.state;
    return (
      <ScreenContext.Provider value={{ screenName: name }}>
        {children}
      </ScreenContext.Provider>
    );
  }
}

MotionScreen.contextType = GlobalContext;

MotionScreen.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
};

MotionScreen.defaultProps = {
  name: null,
};
