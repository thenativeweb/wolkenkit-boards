import classNames from 'classnames';
import Icon from './Icon.jsx';
import Label from './Label.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.css';

const Button = function (props) {
  const { children, className, icon, id, onClick, type } = props;

  const buttonClassNames = classNames(styles.Button, {
    [styles.TypeContextMenu]: type === 'context-menu',
    [styles.TypePrimary]: type === 'primary',
    [styles.TypeIcon]: icon,
    [styles.TypeIconOnly]: icon && !children
  }, className);

  const buttonType = type === 'primary' ? 'submit' : 'button';

  if (!icon) {
    return (
      <button
        id={ id }
        data-id={ props['data-id'] }
        onClick={ onClick }
        className={ buttonClassNames }
        type={ buttonType }
      >
        { children }
      </button>
    );
  }

  return (
    <button
      id={ id }
      data-id={ props['data-id'] }
      onClick={ onClick }
      className={ buttonClassNames }
      type={ buttonType }
    >
      <Icon className={ styles.Icon } name={ props.icon } size={ props.iconSize } />
      { children ? <Label className={ styles.Label }>{ children }</Label> : null }
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
