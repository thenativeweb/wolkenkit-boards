import anime from 'animejs';
import bus from '../../services/eventbus';
import { Button } from 'thenativeweb-ux';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';

const styles = theme => ({
  MediaViewer: {
    position: 'fixed',
    'z-index': theme.zIndex.modal,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    padding: 0,
    margin: 0,
    'pointer-events': 'none'
  },

  Backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    background: theme.color.backdrop,
    opacity: 0,
    transition: 'opacity 200ms',
    'will-change': 'opacity'
  },

  Destination: {
    width: 'auto',
    height: 'auto',
    'max-width': '100%',
    'max-height': '100%',
    'z-index': theme.zIndex.transfer
  },

  Transfer: {
    position: 'fixed',
    opacity: 0,
    'pointer-events': 'none',
    'z-index': theme.zIndex.transfer + 1
  },

  MediaViewerVisible: {
    'pointer-events': 'all',

    '& $Backdrop': {
      opacity: 1,
      cursor: 'pointer'
    },

    '& $CloseButton': {
      visibility: 'visible'
    }
  },

  CloseButton: {
    position: 'fixed',
    top: 0,
    right: 0,
    fill: theme.color.brand.dark,
    cursor: 'pointer',
    visibility: 'hidden',
    transition: 'opacity 200ms',
    'will-change': 'opacity',
    zIndex: theme.zIndex.transfer + 10,
    background: theme.color.brand.white,
    padding: theme.grid.stepSize * 0.75
  }
});

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

    const { classes } = this.props;

    return [
      <img
        key='transfer'
        className={ classes.Transfer }
        ref={ this.handleTransferRefChanged }
        src={ this.state.content.url }
      />,
      <img
        key='destination'
        className={ classes.Destination }
        ref={ this.handleImageRefChanged }
        src={ this.state.content.url }
      />
    ];
  }

  render () {
    const { classes } = this.props;

    return (
      <div
        className={ classNames(classes.MediaViewer, { [classes.MediaViewerVisible]: this.state.isVisible }) }
      >
        <div
          className={ classes.Backdrop }
          onClick={ this.handleCloseClicked }
        />
        { this.renderImage() }
        <Button
          key='close'
          icon='close'
          iconSize='m'
          onClick={ this.handleCloseClicked }
          className={ classes.CloseButton }
        />
      </div>
    );
  }
}

export default injectSheet(styles)(MediaViewer);
