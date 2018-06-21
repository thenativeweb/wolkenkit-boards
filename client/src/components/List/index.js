import classNames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';
import { Transition } from 'thenativeweb-ux';

const styles = theme => ({
  List: {
    background: theme.color.panelBackground,
    'box-shadow': '0 0 10px rgba(0, 0, 0, 0.25)',
    'border-radius': theme.components.borderRadius.default,
    'line-height': '30px',
    overflow: 'hidden'
  },

  Header: {
    'font-size': theme.font.size.xlarge,
    'align-items': 'center',
    'border-bottom': `1px solid ${theme.color.brand.lightGrey}`,
    'font-weight': 700
  }
});

const Header = function (props) {
  const { className, classes, children } = props;

  return (
    <div className={ classNames(classes.Header, className) }>
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

const List = function ({ className, classes, children }) {
  return (
    <div className={ classNames(classes.List, className) }>
      { children }
    </div>
  );
};

List.Header = injectSheet(styles)(Header);
List.Body = Body;

export default injectSheet(styles)(List);
