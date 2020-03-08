import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import actions from '../state/actions';
import { componentTypes } from '../utils/constants';

import { GlobalContext } from './MotionProvider';
import { ScreenContext } from './MotionScreen';

export const ViewContext = React.createContext();

class InternalMotionScene extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { name } = props;
    this.animationTimeout = null;
    this.state = {
      isTargetView: context.store.exitView === props.name,
      animate: false,
      animationQueue: 0,
    };

    const type = context.store.views[props.name]
      ? actions.view.updateViewScreen : actions.view.register;
    context.dispatch({
      type,
      viewName: name,
      screenName: props.screenContext.screenName,
    });
  }

  componentDidMount() {
    const { isTargetView } = this.state;
    const { name, scrollUpOnEnter } = this.props;

    if (isTargetView) {
      console.log(`Source matches with this view: ${name}, dispatching animation`);

      if (scrollUpOnEnter) {
        window.scrollTo(0, 0);
      }

      this.animationTimeout = setTimeout(this.startAnimation, 0);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
  }

  startAnimation = () => {
    this.setState({ animate: true });
  }

  onAnimationEnd = () => {
    this.setState({ isTargetView: false }, this.resetSources);
  }

  getPoints = ({ x, y }, { x: xDest, y: yDest }) => ({
    source: {
      x: x + window.scrollX,
      y: y + window.scrollY,
    },
    dest: {
      x: xDest + window.scrollX,
      y: yDest + window.scrollY,
    },
  });

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
    const { isTargetView, animate, animationQueue } = this.state;

    if (!isTargetView) {
      return null;
    }

    const { store, portal } = this.context;
    const { name } = this.props;

    const { sources, targets } = store.views[name] || {};

    const sourceKeys = Object.keys(sources);
    const targetsKeys = Object.keys(targets);

    if (sourceKeys.length !== targetsKeys.length) {
      return null;
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
            setTimeout(this.onAnimationEnd, 300);
          } else {
            this.setState((state) => ({ animationQueue: state.animationQueue + 1 }));
          }
        },
      };

      const finalProps = {
        ...props,
        key,
        style: { ...props.style, ...source.component.props.style },
      };

      return React.cloneElement(source.component, finalProps);
    }), portal);
  }

  render() {
    const { name, children } = this.props;
    const { animate, isTargetView } = this.state;
    return (
      <ViewContext.Provider value={{ viewName: name }}>
        <div style={{ transition: 'opacity 0.5s', opacity: animate || !isTargetView ? '1' : '0' }}>
          {children}
        </div>
        {this.renderComponents()}
      </ViewContext.Provider>
    );
  }
}

InternalMotionScene.propTypes = {
  name: PropTypes.string.isRequired,
  scrollUpOnEnter: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

InternalMotionScene.defaultProps = {
  scrollUpOnEnter: false,
};

InternalMotionScene.contextType = GlobalContext;

export function MotionScene(props) {
  const screenContext = useContext(ScreenContext);
  return (<InternalMotionScene {...props} screenContext={screenContext} />);
}

export default MotionScene;
