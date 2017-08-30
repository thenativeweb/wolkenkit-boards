import React from 'react';

const Icon = function (props) {
  const { size, name } = props;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' className={ `ui-icon ui-icon-${name} ui-icon--${size}` }>
      <use xlinkHref={ `#icon-${name}` } />
    </svg>
  );
};

Icon.defaultProps = {
  size: 'default'
};

export default Icon;
