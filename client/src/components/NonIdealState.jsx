import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './NonIdealState.css';

const NonIdealState = function (props) {
  const { children, className, when } = props;

  if (!when) {
    return null;
  }

  return (
    <div className={ classNames(styles.NonIdealState, className) }>
      <div className={ `ui-non-ideal-state__message` }>{ children }</div>
    </div>
  );
};

NonIdealState.propTypes = {
  className: PropTypes.string,
  when: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ])
};

export default NonIdealState;
