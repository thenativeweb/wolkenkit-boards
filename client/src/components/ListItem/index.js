import eventbus from '../../services/eventbus';
import { Label } from '../index';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon } from 'thenativeweb-ux';
import { classNames, withStyles } from 'thenativeweb-ux/dist/styles';

const styles = theme => ({
  ListItem: {},

  IconLeft: {
    'margin-right': theme.grid.stepSize
  },

  Label: {
    'flex-grow': 1,
    'flex-shrink': 1
  },

  IconRight: {
    'flex-grow': 0,
    'flex-shrink': 0,
    'margin-left': theme.grid.stepSize * 2
  },

  Button: {},
  Link: {},
  ContextMenuButton: {},

  TypeAdd: {
    display: 'flex',

    '& $Button': {
      padding: `${theme.grid.stepSize * 3}px ${theme.grid.stepSize * 3}px `,
      'font-size': 'inherit',
      'font-weight': 'inherit',
      'flex-grow': 0,
      'flex-shrink': 0,
      'flex-basis': 'auto',
      'text-align': 'left',
      margin: 0,

      '& svg': {
        'margin-right': theme.grid.stepSize * 2
      }
    }
  },

  TypeLink: {
    opacity: 0,

    '& $ContextMenuButton': {
      display: 'none'
    },

    '& $Link': {
      display: 'flex',
      'align-items': 'center',
      'text-decoration': 'none',
      padding: `${theme.grid.stepSize * 3}px ${theme.grid.stepSize * 3.5}px `,
      'font-size': theme.font.size.large,
      color: theme.color.brand.dark,

      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1,
        background: theme.color.brand.dark,
        opacity: 0.1
      }
    },

    '&:hover': {
      background: theme.color.brand.lightGrey,

      '& $ContextMenuButton': {
        display: 'block'
      }
    }
  },

  [theme.device.small]: {
    ContextMenuButton: {},

    TypeLink: {
      '& $ContextMenuButton': {
        display: 'flex'
      }
    }
  }
});

class ListItem extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleContextMenuClicked = this.handleContextMenuClicked.bind(this);
  }

  handleContextMenuClicked (event) {
    const { secondaryActions, onSecondaryAction } = this.props;

    event.preventDefault();
    event.stopPropagation();

    eventbus.emit('context-menu-open', {
      target: event.currentTarget,
      items: secondaryActions,
      onItemSelected: onSecondaryAction
    });
  }

  render () {
    const { classes, className, icon, label, onClick, type } = this.props;

    const itemClassNames = classNames(classes.ListItem, {
      [classes.TypeAdd]: type === 'add',
      [classes.TypeLink]: type === 'link'
    }, className);

    /* eslint-disable no-return-assign */
    switch (type) {
      case 'link':
        return (
          <div ref={ ref => this.element = ref } className={ itemClassNames }>
            <Link className={ classes.Link } to={ this.props.to }>
              { icon ? <Icon className={ classes.IconLeft } name={ icon } size='s' /> : null }

              <Label className={ classes.Label }>{ label }</Label>

              <Button
                className={ classes.ContextMenuButton }
                icon='context-menu'
                iconSize='m'
                adjust='auto'
                onClick={ this.handleContextMenuClicked }
              />

              <Icon className={ classes.IconRight } name='arrow-east' size='s' />
            </Link>
          </div>
        );
      case 'add':
        return (
          <div ref={ ref => this.element = ref } className={ itemClassNames }>
            <Button
              className={ classes.Button }
              icon='add'
              iconSize='m'
              isSubtle={ true }
              onClick={ onClick }
            >
              { label }
            </Button>
          </div>
        );

      default:
        throw new Error('Unspupported type.');
    }
    /* eslint-enable no-return-assign */
  }
}

ListItem.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  secondaryActions: PropTypes.array,
  onClick: PropTypes.func,
  onSecondaryAction: PropTypes.func
};

export default withStyles(styles)(ListItem);
