import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux/dist/styles';

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

export default withStyles(styles)(Label);
