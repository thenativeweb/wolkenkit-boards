import classNames from 'classnames';
import { DraggableCore } from 'react-draggable';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import React from 'react';
import translateToRange from './translateToRange';

const didPositionChange = (previousPosition, newPosition) =>
  previousPosition.x !== newPosition.x ||
    previousPosition.y !== newPosition.y;

const styles = () => ({
  Container: {
    'will-change': 'transform',
    'backface-visibility': 'hidden',
    position: 'absolute'
  }
});

class Draggable extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);

    this.state = {
      isBeingDragged: false,
      rotation: 0,
      position: props.position
    };
  }

  componentDidUpdate (prevProps) {
    // If the parent container changed its state in reaction to an onMoveEnd, a new position
    // will be passed down. Then it's time to remove the draggingPosition values.
    if (didPositionChange(prevProps.position, this.props.position)) {
      this.setState({
        draggingPosition: null
      });
    }
  }

  handleDragStart (event, { node }) {
    const { position } = this.props;
    const parentRect = node.offsetParent.getBoundingClientRect();
    const clientRect = node.getBoundingClientRect();

    this.setState({
      isBeingDragged: true,
      previousPosition: {
        x: position.x,
        y: position.y
      },
      draggingPosition: {
        x: clientRect.left - parentRect.left + node.offsetParent.scrollLeft,
        y: clientRect.top - parentRect.top + node.offsetParent.scrollTop
      }
    });
  }

  handleDragMove (event, { deltaX, deltaY }) {
    this.setState(state => ({
      rotation: translateToRange(deltaX, -120, 120, -20, 20),
      draggingPosition: {
        x: state.draggingPosition.x + deltaX,
        y: state.draggingPosition.y + deltaY
      }
    }));
  }

  handleDragStop () {
    const { onMoveEnd } = this.props;
    const { draggingPosition, previousPosition } = this.state;

    if (didPositionChange(previousPosition, draggingPosition)) {
      onMoveEnd({
        x: draggingPosition.x,
        y: draggingPosition.y
      });
    }

    this.setState({
      rotation: 0,
      isBeingDragged: false,
      previousPosition: null
    });
  }

  render () {
    const { classes, isDisabled, children } = this.props;
    const { draggingPosition, isBeingDragged, rotation } = this.state;
    let { position } = this.props;

    const componentClasses = classNames(classes.Container, {
      [this.props.classNames.IsDragging]: isBeingDragged
    });

    if (draggingPosition) {
      position = draggingPosition;
    }

    return (
      <DraggableCore
        disabled={ isDisabled }
        onStart={ this.handleDragStart }
        onDrag={ this.handleDragMove }
        onStop={ this.handleDragStop }
      >
        <div
          className={ componentClasses }
          style={{ transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)` }}
        >
          { children }
        </div>
      </DraggableCore>
    );
  }
}

Draggable.defaultProps = {
  isDisabled: false,
  classNames: {
    IsDragging: 'IsDragging'
  },
  position: { x: 0, y: 0 },
  onMoveEnd () {}
};

Draggable.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  position: PropTypes.object.isRequired,
  classNames: PropTypes.object,
  onMoveEnd: PropTypes.func
};

export default injectSheet(styles)(Draggable);
