import anime from 'animejs';
import classNames from 'classnames';
import React from 'react';
import styles from './List.css';

const Header = function (props) {
  const { className, children } = props;

  return (
    <div className={ classNames(styles.Header, className) }>
      { children }
    </div>
  );
};

class Item extends React.PureComponent {
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
    const { className, children, type } = this.props;

    const itemClassNames = classNames(styles.Item, {
      [styles.ItemTypeAdd]: type === 'add',
      [styles.ItemTypeLink]: type === 'link'
    }, className);

    /* eslint-disable no-return-assign */
    return (
      <div ref={ ref => this.element = ref } className={ itemClassNames }>
        { children }
      </div>
    );
    /* eslint-enable no-return-assign */
  }
}

const List = function (props) {
  const { className, children } = props;

  return (
    <div className={ classNames(styles.List, className) }>
      { children }
    </div>
  );
};

List.Header = Header;
List.Item = Item;

export default List;
