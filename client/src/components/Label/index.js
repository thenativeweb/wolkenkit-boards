import classNames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';

const styles = {
  Label: {
    display: 'block',
    'flex-grow': 1,
    'flex-shrink': 1,
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    color: 'inherit'
  }
};

const Label = function ({ classes, className, children }) {
  return (
    <div className={ classNames(classes.Label, className) }>
      { children }
    </div>
  );
};

export default injectSheet(styles)(Label);
