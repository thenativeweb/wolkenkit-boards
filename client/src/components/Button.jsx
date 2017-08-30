import Icon from './Icon.jsx';
import Label from './Label.jsx';
import PropTypes from 'prop-types';
import React from 'react';

const Button = function (props) {
  const type = props.type ? `ui-button--${props.type}` : '';

  if (!props.icon) {
    return (
      <button
        id={ props.id }
        data-id={ props['data-id'] }
        onClick={ props.onClick }
        className={ `ui-button ${type} ${props.className || ''}` }
      >
        { props.children }
      </button>
    );
  }

  return (
    <button
      id={ props.id }
      data-id={ props['data-id'] }
      onClick={ props.onClick }
      className={ `ui-button ${type} ui-button--icon ${props.className || ''}` }
    >
      <Icon name={ props.icon } size={ props.iconSize } />
      <Label>{props.children}</Label>
    </button>
  );
};

Button.propTypes = {
  'data-id': PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
