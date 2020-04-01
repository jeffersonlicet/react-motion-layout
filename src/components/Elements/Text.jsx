import React from 'react';
import PropTypes from 'prop-types';
import { componentTypes } from '../../utils/constants';
import BaseElement from './BaseElement';
import MotionImageForwardRef from '../MotionForward';

export default function Text({
  animationKey, animateColor, animateSize, ...props
}) {
  return (
    <BaseElement
      animationKey={animationKey}
      type={componentTypes.text}
      settings={{ animateColor, animateSize }}
    >
      <MotionImageForwardRef type={componentTypes.text} {...props} />
    </BaseElement>
  );
}

Text.propTypes = {
  animationKey: PropTypes.string.isRequired,
  animateColor: PropTypes.bool,
  animateSize: PropTypes.bool,
};

Text.defaultProps = {
  animateSize: true,
  animateColor: true,
};
