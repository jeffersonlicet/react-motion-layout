import React from 'react';
import PropTypes from 'prop-types';
import { componentTypes } from '../../utils/constants';
import BaseElement from './BaseElement';
import MotionImageForwardRef from '../MotionForward';

export default function Div({ animationKey, ...props }) {
  return (
    <BaseElement animationKey={animationKey} type={componentTypes.div}>
      <MotionImageForwardRef type={componentTypes.div} {...props} />
    </BaseElement>
  );
}

Div.propTypes = {
  animationKey: PropTypes.string.isRequired,
};
