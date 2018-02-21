import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const Headline = ({ level, children }) => {
  const componentClasses = classNames(styles.Headline, {
    [styles.Level1]: level === '1',
    [styles.Level2]: level === '2'
  });

  return (
    <div className={ componentClasses }>
      { children }
    </div>
  );
};

Headline.propTypes = {
  level: PropTypes.oneOf([ '1', '2' ])
};

Headline.defaultProps = {
  level: '1'
};

export default Headline;
