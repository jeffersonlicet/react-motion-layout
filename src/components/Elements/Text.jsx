import React from 'react';
import PropTypes from 'prop-types';
import { componentTypes } from '../../utils/constants';
import BaseElement, { ContextProvider } from './BaseElement';
import MotionImageForwardRef from '../MotionForward';

export default function Text({
  animationKey, animateColor, animateSize, ...props
}) {
  return (
    <ContextProvider>
      {({ globalContext, viewContext, screenContext }) => (
        <BaseElement
          animationKey={animationKey}
          type={componentTypes.text}
          settings={{ animateColor, animateSize }}
          globalContext={globalContext}
          viewContext={viewContext}
          screenContext={screenContext}
        >
          <MotionImageForwardRef type="text" {...props} />
        </BaseElement>
      )}
    </ContextProvider>
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
