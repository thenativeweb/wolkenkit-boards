import classNames from 'classnames';
import DialogChrome from './DialogChrome.jsx';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import styles from './Dialog.css';

class Dialog extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleOverlayClicked = this.handleOverlayClicked.bind(this);
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

  handleOverlayClicked () {
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
        <DialogChrome type={ this.props.type }>
          {this.props.children}
        </DialogChrome>
      );
    }

    return (
      <div className={ styles.Dialog }>
        <div className={ backdropClasseNames } onClick={ this.handleOverlayClicked } />
        <ReactTransitionGroup>
          {content}
        </ReactTransitionGroup>
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
