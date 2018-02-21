import classNames from 'classnames';
import Grow from './transitions/Grow.jsx';
import React from 'react';
import styles from './List.css';
import { TransitionGroup } from 'react-transition-group';

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
    <TransitionGroup>
      { React.Children.map(children, child => <Grow>{ child }</Grow>)}
    </TransitionGroup>
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
