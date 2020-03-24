import React from 'react';

const IMAGE = 'image';
const TEXT = 'text';

export default class Motion extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.animation = null;
    this.onAnimationCompleteTimer = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.animate !== this.props.animate && this.props.animate) {
      this.dispatchAnimation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.onAnimationCompleteTimer);
  }

  getAnimationProps = (props) => {
    const { type } = this.props;
    switch (type) {
      case TEXT:
        return {
          transform: props.transform,
        };
      case IMAGE:
        return props;
      default:
        return {};
    }
  }

  endAnimationProps = () => {
    const { endAnimation } = this.props;
    return this.getAnimationProps(endAnimation);
  }

  initialAnimationProps = () => {
    const { initialAnimation } = this.props;
    return this.getAnimationProps(initialAnimation);
  }

  handleRef = (ref) => {
    const { handleRef } = this.props;

    this.ref = ref;

    if (handleRef) {
      handleRef(ref);
    }
  }

  dispatchAnimation = () => {
    const { onAnimationComplete, cssChange } = this.props;

    this.animation = this.ref.animate([
      this.initialAnimationProps(),
      this.endAnimationProps(),
    ], {
      easing: 'ease',
      duration: 400,
      fill: 'forwards',
    });

    this.onAnimationCompleteTimer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 400);

    let animationFrame = (fn) => fn();

    if (typeof window.requestAnimationFrame === 'function') {
      animationFrame = window.requestAnimationFrame;
    }

    animationFrame(() => {
      Object.keys(cssChange).forEach((change) => {
        this.ref.style[change] = cssChange[change];
      });
    });
  }

  getAllowedProps = () => {
    const {
      handleRef, onAnimationComplete, transition, type, cssChange, animate,
      endAnimation, initialAnimation, ...props
    } = this.props;
    return props;
  }

  render() {
    const { type } = this.props;
    const baseProps = this.getAllowedProps();
    const props = {
      ...baseProps,
      ref: this.handleRef,
    };

    switch (type) {
      case IMAGE:
        return <img {...props} />;
      case TEXT:
        return <div {...props} />;
      default:
        return null;
    }
  }
}

Motion.defaultProps = {
  animate: false,
};
