import Button from './Button.jsx';
import DialogChrome from './DialogChrome.jsx';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

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
    let content,
        overlayClasses = 'ui-dialog__backdrop',
        titlebar;

    if (this.props.showClose) {
      titlebar = (
        <div className='dialog__titlebar'>
          <div className='dialog__titlebar__close'>
            <Button icon='close' iconSize='medium' onClick={ this.handleOverlayClicked } />
          </div>
        </div>
      );
    }

    if (!this.props.isVisible) {
      content = null;
      overlayClasses += ' hidden';
    } else {
      content = (
        <DialogChrome type={ this.props.type } titlebar={ titlebar }>
          {this.props.children}
        </DialogChrome>
      );
    }

    return (
      <div className='ui-dialog'>
        <div className={ overlayClasses } onClick={ this.handleOverlayClicked } />
        <ReactTransitionGroup>
          {content}
        </ReactTransitionGroup>
      </div>
    );
  }
}

Dialog.defaultProps = {
  isVisible: false,
  showClose: false,
  type: 'left-aligned',
  onCancel () {}
};

export default Dialog;
