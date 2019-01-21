import PropTypes from 'prop-types';
import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux/dist/styles';

const styles = theme => ({
  MenuItem: {
    display: 'block',
    position: 'relative',
    'line-height': `${theme.grid.stepSize * 6}px`,
    'text-decoration': 'none',
    'white-space': 'nowrap',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    cursor: 'pointer',

    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      height: 1,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.color.brand.dark,
      opacity: 0.1
    },

    '&:hover::after': {
      display: 'none'
    },

    '&:hover': {
      color: theme.color.brand.white,
      background: theme.color.brand.highlight
    }
  },

  SizeS: {
    'font-size': theme.font.size.default,
    'line-height': theme.font.size.default,
    padding: [ theme.grid.stepSize * 1.25, theme.grid.stepSize * 1.5 ]
  },

  SizeM: {
    'font-size': theme.font.size.medium,
    'line-height': `${theme.grid.stepSize * 3}px`,
    padding: [ theme.grid.stepSize * 1.25, theme.grid.stepSize * 3 ]
  }
});

class MenuItem extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.onClick(this.props.id, this.props.data);
  }

  render () {
    const { classes } = this.props;

    const itemClassNames = classNames(classes.MenuItem, {
      [classes.SizeS]: this.props.size === 's',
      [classes.SizeM]: this.props.size === 'm'
    });

    return (
      <div
        className={ itemClassNames }
        onClick={ this.handleClick }
      >
        {this.props.children}
      </div>
    );
  }
}

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.string
};

MenuItem.defaultProps = {
  size: 's'
};

export default withStyles(styles)(MenuItem);
