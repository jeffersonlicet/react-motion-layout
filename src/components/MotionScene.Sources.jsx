import React from 'react';

/**
 * Creates a div that wraps SharedElements sources and
 * handles onClick
 */
export default function RenderSource({ onClick, children }) {
  return React.createElement('div', { onClick }, children);
}
