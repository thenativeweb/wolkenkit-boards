import classNames from 'classnames';
import React from 'react';
import styles from './Form.css';

/* eslint-disable react/prefer-stateless-function */
class Row extends React.PureComponent {
  render () {
    const { className, children, horizontalContentAlign, type, verticalContentAlign } = this.props;

    const rowClassNames = classNames(styles.Row, {
      [styles.RowTypeMessage]: type === 'message',
      [styles.RowTypeActionButtons]: type === 'action-buttons',
      [styles.HorizontalContentAlignLeft]: horizontalContentAlign === 'left',
      [styles.VerticalContentAlignCenter]: verticalContentAlign === 'center'
    }, className);

    return (
      <div className={ rowClassNames }>
        { children }
      </div>
    );
  }
}

class Form extends React.PureComponent {
  render () {
    const { className, onSubmit, children } = this.props;

    return (
      <form className={ classNames(styles.Form, className) } onSubmit={ onSubmit }>
        { children }
      </form>
    );
  }
}

Form.Row = Row;

/* eslint-enable react/prefer-stateless-function */

export default Form;
