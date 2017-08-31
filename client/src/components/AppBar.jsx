import React from 'react';
import styles from './AppBar.css';

const AppBar = ({ children }) => (
  <div className={ styles.AppBar }>
    { children }
  </div>
);

export default AppBar;
