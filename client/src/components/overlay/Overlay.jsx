import anime from 'animejs';
import React from 'react';
import styles from './Overlay.css';

class Overlay extends React.PureComponent {
  componentWillEnter (done) {
    anime({
      targets: this.element,
      opacity: 1,
      translateY: [ -40, -10 ],
      duration: Overlay.transitionDuration,
      easing: 'easeOutBack',
      complete: done
    });
  }

  componentWillLeave (done) {
    anime({
      targets: this.element,
      opacity: [ 1, 0 ],
      translateY: [ -10, -40 ],
      duration: Overlay.transitionDuration,
      easing: 'easeOutExpo',
      complete: done
    });
  }

  render () {
    /* eslint-disable no-return-assign */
    return (
      <div ref={ ref => this.element = ref } className={ styles.Overlay }>
        <div className='ui-overlay__text'>{ this.props.children }</div>
      </div>
    );
    /* eslint-enable no-return-assign */
  }
}

Overlay.transitionDuration = 300;

export default Overlay;
