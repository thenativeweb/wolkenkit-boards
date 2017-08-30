import React from 'react';

/* eslint-disable react/prefer-stateless-function */
class Row extends React.PureComponent {
  render () {
    const { className, children, type } = this.props;

    let classes = `ui-form__row ${className}`;

    if (type) {
      type.split(' ').forEach(newType => {
        classes += ` ui-form__row--${newType}`;
      });
    }

    return (
      <div className={ classes }>
        { children }
      </div>
    );
  }
}

class Form extends React.PureComponent {
  render () {
    const { className, onSubmit, children } = this.props;

    return (
      <form className={ `ui-form ${className}` } onSubmit={ onSubmit }>
        { children }
      </form>
    );
  }
}

Form.Row = Row;

/* eslint-enable react/prefer-stateless-function */

export default Form;
