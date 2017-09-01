import classNames from 'classnames';
import React from 'react';
import styles from './Label.css';

const Label = function (props) {
  return (
    <div className={ classNames(styles.Label, props.className) }>
      { props.children }
    </div>
  );
};

export default Label;
