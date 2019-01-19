import { classNames } from 'thenativeweb-ux/dist/styles';
import React from 'react';

const Screen = function (props) {
  return (
    <div className={ classNames('ui-screen', `ui-screen--${props.name}`, props.className) }>
      { props.children }
    </div>
  );
};

export default Screen;
