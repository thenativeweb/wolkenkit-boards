import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const Icon = ({ className, color, name, size, style, type }) => {
  const iconClassNames = classNames(styles.Icon, {
    [styles.ColorDefault]: color === 'default',
    [styles.ColorHighlight]: color === 'highlight',
    [styles.ColorWhite]: color === 'white',
    [styles.TypeInline]: type === 'inline',
    [styles.TypeFlexAuto]: type === 'flex-auto',
    [styles.SizeXS]: size === 'xs',
    [styles.SizeS]: size === 's',
    [styles.SizeM]: size === 'm',
    [styles.SizeL]: size === 'l',
    [styles.SizeXL]: size === 'xl',
    [styles.SizeXXL]: size === 'xxl'
  }, className);

  return (
    <svg xmlns='http://www.w3.org/2000/svg' className={ iconClassNames } role='presentational' style={ style }>
      <use xlinkHref={ `#icon-${name}` } />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf([ 'default', 'highlight', 'white' ]),
  size: PropTypes.oneOf([ 'xs', 's', 'm', 'l', 'xl', 'xxl' ]),
  style: PropTypes.object,
  type: PropTypes.oneOf([ 'default', 'inline', 'flex-auto' ])
};

Icon.defaultProps = {
  size: 's',
  color: 'default',
  type: 'default'
};

export default Icon;
