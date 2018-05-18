import anime from 'animejs';
import bus from '../services/eventbus';
import { Button } from 'thenativeweb-ux';
import classNames from 'classnames';
import React from 'react';
import styles from './MediaViewer.css';

class MediaViewer extends React.Component {
  constructor (props) {
    super(props);

    this.handleImageRefChanged = this.handleImageRefChanged.bind(this);
    this.handleTransferRefChanged = this.handleTransferRefChanged.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleShowEvent = this.handleShowEvent.bind(this);
    this.handleCloseClicked = this.handleCloseClicked.bind(this);

    this.state = {
      isVisible: false,
      content: '',
      type: 'image',
      sourceElement: undefined
    };
  }

  componentDidMount () {
    bus.on('mediaViewer::show', this.handleShowEvent);
  }

  componentDidUpdate () {
    if (this.state.isVisible) {
      window.addEventListener('keydown', this.handleKeyDown);
    } else {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount () {
    bus.removeListener('mediaViewer::show', this.handleShowEvent);
  }

  handleImageRefChanged (ref) {
    this.imageRef = ref;
  }

  handleTransferRefChanged (ref) {
    this.transferRef = ref;
  }

  handleShowEvent (event) {
    this.show(event);
  }

  show (options) {
    if (this.isAnimating) {
      return false;
    }

    this.setState({
      isVisible: true,
      content: options.media,
      type: options.type,
      sourceElement: options.element
    }, () => {
      this.animateIn();
    });
  }

  hide () {
    this.setState({
      isVisible: false,
      content: undefined,
      type: undefined,
      sourceElement: undefined
    });
  }

  handleCloseClicked () {
    if (this.isAnimating) {
      return false;
    }

    this.animateOut(() => {
      this.hide();
    });
  }

  handleKeyDown (event) {
    switch (event.keyCode) {
      case 27:
        this.handleCloseClicked();
        break;
      default:
        break;
    }
  }

  animateIn () {
    this.isAnimating = true;

    const destinationElement = this.imageRef;

    const destination = destinationElement.getBoundingClientRect(),
          source = this.state.sourceElement.getBoundingClientRect();

    const destinationX = destination.left,
          destinationY = destination.top,
          sourceX = source.left,
          sourceY = source.top;

    destinationElement.style.opacity = 0;

    anime({
      targets: this.transferRef,
      opacity: [ 1, 1 ],
      width: [ source.width, destination.width ],
      height: [ source.height, destination.height ],
      left: [ sourceX, destinationX ],
      top: [ sourceY, destinationY ],
      duration: 600,
      elasticity: 100,
      easing: 'easeOutCirc',
      complete: () => {
        this.isAnimating = false;
        destinationElement.style.opacity = 1;
      }
    });
  }

  animateOut (done) {
    this.isAnimating = true;

    const sourceElement = this.imageRef;

    const destination = this.state.sourceElement.getBoundingClientRect(),
          source = sourceElement.getBoundingClientRect();

    const destinationX = destination.left,
          destinationY = destination.top,
          sourceX = source.left,
          sourceY = source.top;

    sourceElement.style.opacity = 0;

    anime({
      targets: this.transferRef,
      opacity: [ 1, 0.25 ],
      width: [ source.width, destination.width ],
      height: [ source.height, destination.height ],
      left: [ sourceX, destinationX ],
      top: [ sourceY, destinationY ],
      duration: 500,
      easing: 'easeInOutCirc',
      complete: () => {
        this.isAnimating = false;
        done();
      }
    });
  }

  renderImage () {
    if (!this.state.isVisible) {
      return null;
    }

    return [
      <img
        key='transfer'
        className={ styles.Transfer }
        ref={ this.handleTransferRefChanged }
        src={ this.state.content.url }
      />,
      <img
        key='destination'
        className={ styles.Destination }
        ref={ this.handleImageRefChanged }
        src={ this.state.content.url }
      />
    ];
  }

  render () {
    return (
      <div
        className={ classNames(styles.MediaViewer, { [styles.MediaViewerVisible]: this.state.isVisible }) }
      >
        <div
          className={ styles.Backdrop }
          onClick={ this.handleCloseClicked }
        />
        { this.renderImage() }
        <Button
          key='close'
          icon='close'
          iconSize='m'
          onClick={ this.handleCloseClicked }
          className={ styles.CloseButton }
        />
      </div>
    );
  }
}

export default MediaViewer;
