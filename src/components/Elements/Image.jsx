import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { componentTypes } from '../../utils/constants';
import BaseElement, { ContextProvider } from './BaseElement';

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
          <motion.img {...props} />
        </BaseElement>
      )}
    </ContextProvider>
  );
}

Image.propTypes = {
  animationKey: PropTypes.string.isRequired,
};
