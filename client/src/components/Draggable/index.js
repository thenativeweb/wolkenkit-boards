import classNames from 'classnames';
import { DraggableCore } from 'react-draggable';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import React from 'react';
import translateToRange from './translateToRange';

const didPositionChange = (previousPosition, newPosition) =>
  previousPosition.left !== newPosition.left ||
    previousPosition.top !== newPosition.top;

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
      left: props.left,
      top: props.top
    };
  }

  componentDidUpdate (prevProps) {
    // If the backend has saved the new values after a move, a new position
    // will be passed down. Then it's time to remove the draggingPosition values.
    if (didPositionChange(prevProps, this.props)) {
      this.setState({
        draggingPosition: null
      });
    }
  }

  handleDragStart (event, { node }) {
    const parentRect = node.offsetParent.getBoundingClientRect();
    const clientRect = node.getBoundingClientRect();

    this.setState({
      isBeingDragged: true,
      previousPosition: {
        left: this.props.left,
        top: this.props.top
      },
      draggingPosition: {
        left: clientRect.left - parentRect.left + node.offsetParent.scrollLeft,
        top: clientRect.top - parentRect.top + node.offsetParent.scrollTop
      }
    });
  }

  handleDragMove (event, { deltaX, deltaY }) {
    this.setState(state => ({
      rotation: translateToRange(deltaX, -120, 120, -20, 20),
      draggingPosition: {
        left: state.draggingPosition.left + deltaX,
        top: state.draggingPosition.top + deltaY
      }
    }));
  }

  handleDragStop () {
    const { onMoveEnd } = this.props;
    const { draggingPosition, previousPosition } = this.state;

    if (didPositionChange(previousPosition, draggingPosition)) {
      onMoveEnd({
        top: draggingPosition.top,
        left: draggingPosition.left
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
    let { left, top } = this.props;

    const componentClasses = classNames(classes.Container, {
      [this.props.classNames.IsDragging]: isBeingDragged
    });

    if (draggingPosition) {
      left = draggingPosition.left;
      top = draggingPosition.top;
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
          style={{ transform: `translate(${left}px, ${top}px) rotate(${rotation}deg)` }}
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
  left: 0,
  top: 0,
  onMoveEnd () {}
};

Draggable.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  classNames: PropTypes.object,
  onMoveEnd: PropTypes.func
};

export default injectSheet(styles)(Draggable);
