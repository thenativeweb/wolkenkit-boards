import React from 'react';

const Label = function (props) {
  return (
    <div className={ `ui-label` }>
      { props.children }
    </div>
  );
};

export default Label;
