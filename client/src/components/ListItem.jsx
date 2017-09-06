import anime from 'animejs';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './ListItem.css';
import { Button, Icon, Label } from './index';

class ListItem extends React.PureComponent {
  componentWillEnter (done) {
    anime({
      targets: this.element,
      opacity: [ 0, 1 ],
      duration: 400,
      easing: 'easeOutBack',
      complete: done
    });
  }

  componentWillLeave (done) {
    anime({
      targets: this.element,
      opacity: [ 1, 0 ],
      scaleY: [ 1, 0 ],
      duration: 300,
      easing: 'easeOutExpo',
      complete: done
    });
  }

  render () {
    const { className, icon, label, onContextMenu, onClick, type } = this.props;

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
                data-id={ this.props['data-id'] }
                onClick={ onContextMenu }
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

export default ListItem;
