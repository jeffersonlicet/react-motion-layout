import React from 'react';
import Motion from './Motion';

/**
 * Forwards ref to Motion Component
 */
const MotionImageForwardRef = React.forwardRef((props, ref) => (
  <Motion {...props} handleRef={ref} />
));

export default MotionImageForwardRef;
