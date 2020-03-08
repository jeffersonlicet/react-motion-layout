import React from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import { GlobalContext } from './MotionProvider';
import actions from '../state/actions';

class RouterLink extends React.Component {
  onClick = (e) => {
    const {
      to, history, replace, location,
    } = this.props;
    const { store, dispatch } = this.context;

    const destination = typeof to === 'function' ? to(location) : to;

    if (store.screen) {
      e.preventDefault();

      const method = replace ? history.replace : history.push;

      const num = Object.keys(store.views)
        .reduce((acc, view) => {
          const { screenName } = store.views[view];
          acc[screenName] = [...(acc[screenName] || []), view];
          return acc;
        }, {});

      if (num[store.screen].length === 1) {
        console.log('Just one Motion Scene, trigger');
        const activeView = num[store.screen][0];
        dispatch({
          type: actions.view.setExitView,
          viewName: num[store.screen][0],
        });

        const { sources } = store.views[activeView];

        Object.keys(sources).forEach((animationKey) => {
          const { ref } = sources[animationKey];
          dispatch({
            type: actions.view.updateSourceRect,
            rect: ref.getBoundingClientRect(),
            viewName: activeView,
            animationKey,
          });
        });

        method(destination);
      }
    }
  };

  render() {
    const { replace, target, children, style, className, to } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        replace={replace}
        target={target}
        onClick={this.onClick}
        style={style}
        className={className}
        to={to}
      >
        {children}
      </Link>
    );
  }
}

RouterLink.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  replace: PropTypes.bool,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  target: PropTypes.any,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

RouterLink.defaultProps = {
  replace: false,
  target: null,
  className: '',
  style: null,
};

RouterLink.contextType = GlobalContext;

export default withRouter(RouterLink);
