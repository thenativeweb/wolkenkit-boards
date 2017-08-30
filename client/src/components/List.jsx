import anime from 'animejs';
import React from 'react';

const Header = function (props) {
  const { className, children, type } = props;

  return (
    <div className={ `ui-list__header ui-list__header--${type || 'default'} ${className || ''}` }>
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

    /* eslint-disable no-return-assign */
    return (
      <div ref={ ref => this.element = ref } className={ `ui-list__item ui-list__item--${type || 'default'} ${className || ''}` }>
        { children }
      </div>
    );
    /* eslint-enable no-return-assign */
  }
}

const List = function (props) {
  const { className, children } = props;

  return (
    <div className={ `ui-list ${className || ''}` }>
      { children }
    </div>
  );
};

List.Header = Header;
List.Item = Item;

export default List;
