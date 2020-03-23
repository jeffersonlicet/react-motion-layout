import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import actions from '../state/actions';
import { componentTypes } from '../utils/constants';

import GlobalContext from '../utils/globalContext';
import { ScreenContext } from './MotionScreen';

export const ViewContext = React.createContext();

class InternalMotionScene extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.animationTimeout = null;
    this.endTimeout = null;

    this.state = {
      isTargetView: false,
      animate: false,
      animationQueue: 0,
      mounted: false,
    };

    if (context) {
      const { name, screenContext } = props;
      const { store, dispatch } = context;
      const isTargetView = store.exitView === name;

      const type = store.views[name] ? actions.view.updateViewScreen : actions.view.register;
      const { screenName } = screenContext || {};

      this.state.isTargetView = isTargetView;

      dispatch({
        type,
        viewName: name,
        screenName,
      });
    }
  }

  componentDidMount() {
    const { isTargetView } = this.state;
    const { scrollUpOnEnter } = this.props;

    this.setState({ mounted: true });

    if (isTargetView) {
      if (scrollUpOnEnter) {
        window.scrollTo(0, 0);
      }

      // Capture scroll position in case user scrolls during animation
      this.setState({
        scroll: {
          source: {
            x: window.scrollX,
            y: window.scrollY,
          },
        },
      }, this.startAnimation);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.endTimeout);
  }

  shouldBeVisible = () => {
    const { store } = this.context || {};
    const { animate, mounted, isTargetView } = this.state;
    return !store || !store.exitView || animate || (mounted && !isTargetView);
  }

  startAnimation = () => {
    this.setState({ animate: true });
  }

  onAnimationEnd = () => {
    this.setState({ isTargetView: false }, this.resetSources);
  }

  getPoints = ({ x, y }, { x: xDest, y: yDest }) => {
    const { scroll } = this.state;
    return {
      source: {
        x: x + scroll.source.x,
        y: y + scroll.source.y,
      },
      dest: {
        x: xDest + window.scrollX,
        y: yDest + window.scrollY,
      },
    };
  }

  resetSources = () => {
    const { name: viewName } = this.props;
    const { store, dispatch } = this.context;
    const { sources, targets } = store.views[viewName];

    Object.keys(sources).forEach((animationKey) => {
      dispatch({
        type: actions.view.deleteTarget,
        viewName,
        animationKey,
      });

      dispatch({
        type: actions.view.deleteSource,
        viewName,
        animationKey,
      });

      const target = targets[animationKey];

      target.ref.style.opacity = 1;

      dispatch({
        type: actions.view.registerSource,
        component: target,
        viewName,
        animationKey,
      });
    });
  }

  renderComponents() {
    const {
      isTargetView, animate, animationQueue, scroll,
    } = this.state;

    if (!isTargetView || !scroll) {
      return null;
    }

    const { store, portal } = this.context;
    const { name } = this.props;

    const { sources, targets } = store.views[name] || {};

    const sourceKeys = Object.keys(sources);
    const targetsKeys = Object.keys(targets);

    if (sourceKeys.length !== targetsKeys.length) {
      console.log('Missing target elements');
    }

    return ReactDOM.createPortal(sourceKeys.map((key) => {
      const source = sources[key];
      const target = targets[key];

      let fontSize;
      let color;

      if (!target) {
        console.log(`Not target for ${key}`);
        return null;
      }

      if (target.type !== source.type) {
        console.log('Source and target elements must have the same type', target.type, source.type, name, key);
        return null;
      }

      const { rect } = source;
      const targetRect = target.ref.getBoundingClientRect();

      const points = this.getPoints(rect, targetRect);
      const style = {
        marginTop: '0px !important',
        marginLeft: '0px !important',
        marginBottom: '0px !important',
        marginRight: '0px !important',
        position: 'absolute',
        x: points.source.x,
        y: points.source.y,
        willChange: 'transform, width, height',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        pointerEvents: 'none',
      };

      if (source.type === componentTypes.text
        && (source.settings.animateSize || source.settings.animateColor)) {
        const computedStyle = window.getComputedStyle(target.ref, null);
        if (source.settings.animateSize) {
          fontSize = `${parseFloat(computedStyle.getPropertyValue('font-size'))}px`;
        }

        if (source.settings.animateColor) {
          color = computedStyle.getPropertyValue('color');
        }
      }

      const animateProps = {
        target: {
          width: `${targetRect.width}px`,
          height: `${targetRect.height}px`,
          x: points.dest.x,
          y: points.dest.y,
          color,
          fontSize,
        },
      };

      target.ref.style.opacity = 0;

      const props = {
        initial: false,
        style,
        animate: animate ? animateProps.target : {},
        transition: { duration: 0.4 },
        onAnimationComplete: () => {
          if (animationQueue + 1 === Object.keys(sources).length) {
            this.endTimeout = setTimeout(this.onAnimationEnd, 100);
          } else {
            this.setState((state) => ({ animationQueue: state.animationQueue + 1 }));
          }
        },
      };

      const finalProps = {
        ...props,
        key,
        style: { ...source.component.props.style, ...props.style },
      };

      return React.cloneElement(source.component, finalProps);
    }), portal);
  }

  render() {
    const { name, children, onClick } = this.props;
    return (
      <ViewContext.Provider value={{ viewName: name }}>
        { React.cloneElement(children, {
          ...children.props,
          onClick: (e) => {
            if (onClick) {
              onClick(e);
            }

            if (children.onClick) {
              children.onClick(e);
            }
          },
          style: {
            ...children.props.style,
            transition: 'opacity 0.4s',
            opacity: this.shouldBeVisible() ? '1' : '0',
          },
        }) }
        {this.renderComponents()}
      </ViewContext.Provider>
    );
  }
}

InternalMotionScene.propTypes = {
  name: PropTypes.string.isRequired,
  scrollUpOnEnter: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

InternalMotionScene.defaultProps = {
  scrollUpOnEnter: false,
  onClick: null,
};

InternalMotionScene.contextType = GlobalContext;

export function MotionScene(props) {
  const screenContext = useContext(ScreenContext);
  return (<InternalMotionScene {...props} screenContext={screenContext} />);
}

export default MotionScene;
