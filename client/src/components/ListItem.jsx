import classNames from 'classnames';
import eventbus from '../services/eventbus';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './ListItem.css';
import { Button, Icon, Label } from './index';

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
    const { className, icon, label, onClick, type } = this.props;

    const itemClassNames = classNames(styles.ListItem, {
      [styles.TypeAdd]: type === 'add',
      [styles.TypeLink]: type === 'link'
    }, className);

    /* eslint-disable no-return-assign */
    switch (type) {
      case 'link':
        return (
          <div ref={ ref => this.element = ref } className={ itemClassNames }>
            <Link className={ styles.Link } to={ this.props.to }>
              { icon ? <Icon className={ styles.IconLeft } name={ icon } size='s' /> : null }

              <Label className={ styles.Label }>{ label }</Label>

              <Button
                className={ styles.ContextMenuButton }
                type='context-menu'
                icon='context-menu'
                iconSize='m'
                onClick={ this.handleContextMenuClicked }
              />

              <Icon className={ styles.IconRight } name='arrow-east' size='s' />
            </Link>
          </div>
        );
      case 'add':
        return (
          <div ref={ ref => this.element = ref } className={ itemClassNames }>
            <Button
              className={ styles.Button }
              icon='add'
              iconSize='m'
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

export default ListItem;
