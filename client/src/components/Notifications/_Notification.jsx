import classNames from 'classnames';
import React from 'react';
import styles from './_Notification.css';

const Notification = ({ type, text }) => {
  const componentClasses = classNames(styles.Notification, {
    [styles.TypeError]: type === 'error',
    [styles.TypeSuccess]: type === 'success'
  });

  return (
    <div className={ componentClasses }>
      <div className={ styles.Text }>{ text }</div>
    </div>
  );
};

export default Notification;
