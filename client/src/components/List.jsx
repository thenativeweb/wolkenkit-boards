import classNames from 'classnames';
import React from 'react';
import styles from './List.css';
import { Transition } from 'thenativeweb-ux';

const Header = function (props) {
  const { className, children } = props;

  return (
    <div className={ classNames(styles.Header, className) }>
      { children }
    </div>
  );
};

const Body = function ({ children }) {
  return (
    <Transition.Group type='Grow'>
      { children }
    </Transition.Group>
  );
};

const List = function (props) {
  const { className, children } = props;

  return (
    <div className={ classNames(styles.List, className) }>
      { children }
    </div>
  );
};

List.Header = Header;
List.Body = Body;

export default List;
