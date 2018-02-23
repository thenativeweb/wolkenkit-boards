import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import transtions from '../transitions';

const KEY = {
  ENTER: 13,
  ESCAPE: 27
};

const Row = function ({ children }) {
  return (
    <div className={ styles.Row }>{ children }</div>
  );
};

class Modal extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleBackDropClicked = this.handleBackDropClicked.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount () {
    this.handleVisibility(this.props.isVisible);
  }

  componentDidUpdate () {
    this.handleVisibility(this.props.isVisible);
  }

  componentWillUnmount () {
    this.handleVisibility(false);
  }

  handleVisibility (isVisible) {
    if (isVisible) {
      document.addEventListener('keydown', this.handleKeyDown);
      document.querySelector('body').classList.add('tnw-modal--visible');
    } else {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.querySelector('body').classList.remove('tnw-modal--visible');
    }
  }

  handleKeyDown (event) {
    switch (event.keyCode) {
      case KEY.ESCAPE:
        if (this.props.onCancel) {
          this.props.onCancel();
        }
        break;
      case KEY.ENTER:
        break;
      default:
        break;
    }

    this.props.onKeyDown(event.keyCode, event);
  }

  handleBackDropClicked () {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render () {
    const { attach, className, children, isVisible, size } = this.props;

    const backdropClasses = classNames(styles.Backdrop, {
      [styles.BackdropIsVisible]: isVisible
    });

    const contentClasses = classNames(styles.Content, {
      [styles.ContentSizeS]: size === 's',
      [styles.ContentSizeM]: size === 'm',
      [styles.ContentAttachedSidebar]: attach === 'sidebar',
      [styles.ContentAttachedLeft]: attach === 'left',
      [styles.ContentAttachedRight]: attach === 'right',
      [styles.ContentAttachedCenter]: attach === 'center'
    }, className);

    let Transition;

    switch (attach) {
      case 'left':
      case 'sidebar':
        Transition = transtions.FadeInRight;
        break;
      case 'right':
        Transition = transtions.FadeInLeft;
        break;
      default:
        Transition = transtions.Zoom;
    }

    return (
      <div className={ styles.Modal }>
        <div className={ backdropClasses } onClick={ this.handleBackDropClicked } />
        <Transition in={ isVisible }>
          <div className={ contentClasses } role='dialog'>{ children }</div>
        </Transition>
      </div>
    );
  }
}

Modal.Row = Row;

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  attach: PropTypes.oneOf([ 'left', 'right', 'sidebar', 'center' ]),
  size: PropTypes.oneOf([ 's', 'm' ]),
  onKeyDown: PropTypes.func
};

Modal.defaultProps = {
  attach: 'left',
  isVisible: false,
  size: 's',
  onCancel () {},
  onKeyDown () {}
};

export default Modal;
