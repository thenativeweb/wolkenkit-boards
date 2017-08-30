import anime from 'animejs';
import bus from '../services/eventbus';
import Button from './Button.jsx';
import React from 'react';

class MediaViewer extends React.Component {
  constructor (props) {
    super(props);

    this.handleImageRefChanged = this.handleImageRefChanged.bind(this);
    this.handleTransferRefChanged = this.handleTransferRefChanged.bind(this);
    this.handleShowEvent = this.handleShowEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);

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

  handleClick () {
    if (this.isAnimating) {
      return false;
    }

    this.animateOut(() => {
      this.hide();
    });
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
        className='ui-media-viewer__transfer'
        ref={ this.handleTransferRefChanged }
        src={ this.state.content.url }
      />,
      <img
        key='destination'
        className='ui-media-viewer__destination'
        ref={ this.handleImageRefChanged }
        src={ this.state.content.url }
      />
    ];
  }

  render () {
    return (
      <div
        className={ `ui-media-viewer ${this.state.isVisible ? 'ui-media-viewer--visible' : ''}` }
      >
        <div
          className={ `ui-media-viewer__backdrop` }
          onClick={ this.handleClick }
        />
        { this.renderImage() }
        <Button
          key='close'
          icon='close'
          iconSize='medium'
          onClick={ this.handleClick }
          className={ `ui-media-viewer__close` }
        />
      </div>
    );
  }
}

export default MediaViewer;
