import classNames from 'classnames';
import React from 'react';
import styles from './Icon.css';

const Icon = function (props) {
  const { className, size, name, style } = props;

  const iconClassNames = classNames(styles.Icon, {
    [styles.SizeXS]: size === 'xs',
    [styles.SizeS]: size === 's',
    [styles.SizeM]: size === 'm',
    [styles.SizeL]: size === 'l',
    [styles.SizeXL]: size === 'xl'
  }, className);

  return (
    <svg style={ style } xmlns='http://www.w3.org/2000/svg' className={ iconClassNames }>
      <use xlinkHref={ `#icon-${name}` } />
    </svg>
  );
};

Icon.defaultProps = {
  size: 'default'
};

export default Icon;
