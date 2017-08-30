import anime from 'animejs';
import React from 'react';

class DialogChrome extends React.PureComponent {
  componentWillEnter (done) {
    anime({
      targets: this.element,
      opacity: [ 0, 1 ],
      translateX: [ '-25%', 0 ],
      duration: DialogChrome.transitionDuration,
      easing: 'easeOutExpo',
      complete: done
    });
  }

  componentWillLeave (done) {
    anime({
      targets: this.element,
      opacity: [ 1, 0 ],
      translateX: [ 0, '-25%' ],
      duration: DialogChrome.transitionDuration,
      easing: 'easeOutExpo',
      complete: done
    });
  }

  render () {
    /* eslint-disable no-return-assign */
    return (
      <div ref={ ref => this.element = ref } className={ `ui-dialog__chrome dialog--${this.props.type}` }>
        { this.props.titlebar }
        <div className='dialog__content'>
          {this.props.children}
        </div>
      </div>
    );
    /* eslint-enable no-return-assign */
  }
}

DialogChrome.transitionDuration = 300;

export default DialogChrome;
