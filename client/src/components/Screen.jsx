import classNames from 'classnames';
import React from 'react';

const Screen = function (props) {
  return (
    <div className={ classNames('ui-screen', `ui-screen--${props.name}`) }>
      { props.children }
    </div>
  );
};

export default Screen;
