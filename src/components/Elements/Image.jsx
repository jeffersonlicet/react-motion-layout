import React from 'react';
import PropTypes from 'prop-types';
import { componentTypes } from '../../utils/constants';
import BaseElement, { ContextProvider } from './BaseElement';
import MotionImageForwardRef from '../MotionForward';

export default function Image({ animationKey, ...props }) {
  return (
    <ContextProvider>
      {({ globalContext, viewContext, screenContext }) => (
        <BaseElement
          animationKey={animationKey}
          type={componentTypes.image}
          settings={{}}
          globalContext={globalContext}
          viewContext={viewContext}
          screenContext={screenContext}
        >
          <MotionImageForwardRef type="image" {...props} />
        </BaseElement>
      )}
    </ContextProvider>
  );
}

Image.propTypes = {
  animationKey: PropTypes.string.isRequired,
};
