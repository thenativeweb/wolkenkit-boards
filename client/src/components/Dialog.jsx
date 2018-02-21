import classNames from 'classnames';
import DialogChrome from './DialogChrome.jsx';
import FadeInRight from './transitions/FadeInRight.jsx';
import React from 'react';
import styles from './Dialog.css';
import { TransitionGroup } from 'react-transition-group';

class Dialog extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleBackDropClicked = this.handleBackDropClicked.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate () {
    if (this.props.isVisible) {
      window.addEventListener('keydown', this.handleKeyDown);
      document.querySelector('body').classList.add('dialog--visible');
    } else {
      window.removeEventListener('keydown', this.handleKeyDown);
      document.querySelector('body').classList.remove('dialog--visible');
    }
  }

  handleKeyDown (event) {
    switch (event.keyCode) {
      case 27:
        this.props.onCancel();
        break;
      default:
        break;
    }
  }

  handleBackDropClicked () {
    this.props.onCancel();
  }

  render () {
    let content;

    const backdropClasseNames = classNames(styles.Backdrop, {
      [styles.BackdropHidden]: !this.props.isVisible
    });

    if (!this.props.isVisible) {
      content = null;
    } else {
      content = (
        <FadeInRight>
          <DialogChrome type={ this.props.type }>
            {this.props.children}
          </DialogChrome>
        </FadeInRight>
      );
    }

    return (
      <div className={ styles.Dialog }>
        <div className={ backdropClasseNames } onClick={ this.handleBackDropClicked } />
        <TransitionGroup>
          {content}
        </TransitionGroup>
      </div>
    );
  }
}

Dialog.defaultProps = {
  isVisible: false,
  type: 'left-aligned',
  onCancel () {}
};

export default Dialog;
