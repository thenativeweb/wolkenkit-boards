import PropTypes from 'prop-types';
import React from 'react';

const NonIdealState = function (props) {
  const { children, className, when } = props;

  if (!when) {
    return null;
  }

  return (
    <div className={ `ui-non-ideal-state ${className}` }>
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
