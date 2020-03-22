import React from 'react';
import classNames from 'classnames';

export default function ButtonWhite({
  to, children, className, target,
}) {
  return (
    <a
      href={to}
      target={target || '_self'}
      className={classNames('hover:text-gray-500 button_pink rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-100 md:text-lg xl:text-base text-gray-600 font-semibold leading-tight shadow-md', className)}
    >
      {children}
    </a>
  );
}
