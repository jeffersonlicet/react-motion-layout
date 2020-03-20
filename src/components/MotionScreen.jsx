import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../utils/globalContext';
import actions from '../state/actions';

console.log(GlobalContext);
export const ScreenContext = React.createContext();

export default class MotionScreen extends React.Component {
  componentDidMount() {
    const { dispatch } = this.context;
    const { name } = this.props;
    dispatch({ type: actions.view.setScreen, screen: name });
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
