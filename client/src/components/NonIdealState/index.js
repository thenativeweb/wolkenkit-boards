import classNames from 'classnames';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  NonIdealState: {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    padding: theme.grid.stepSize * 6
  },

  Message: {
    'text-align': 'center',
    'max-width': '50%',
    'font-size': theme.font.size.xlarge,
    color: theme.color.brand
  }
});

const NonIdealState = function (props) {
  const { children, classes, className, when } = props;

  if (!when) {
    return null;
  }

  return (
    <div className={ classNames(classes.NonIdealState, className) }>
      <div className={ classes.Message }>{ children }</div>
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

export default injectSheet(styles)(NonIdealState);
