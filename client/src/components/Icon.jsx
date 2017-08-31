import React from 'react';

const Icon = function (props) {
  const { className, size, name, style } = props;

  return (
    <svg style={ style } xmlns='http://www.w3.org/2000/svg' className={ `ui-icon ui-icon-${name} ui-icon--${size} ${className}` }>
      <use xlinkHref={ `#icon-${name}` } />
    </svg>
  );
};

Icon.defaultProps = {
  size: 'default'
};

export default Icon;
