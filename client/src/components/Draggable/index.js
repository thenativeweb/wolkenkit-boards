import { DraggableCore } from 'react-draggable';
import PropTypes from 'prop-types';
import React from 'react';
import { animated, Spring } from 'react-spring';
import { classNames, withStyles } from 'thenativeweb-ux/dist/styles';

const didPositionChange = function (previousPosition = {}, newPosition = {}) {
  if (newPosition === null || previousPosition === null) {
    return false;
  }

  return previousPosition.x !== newPosition.x || previousPosition.y !== newPosition.y;
};

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
      deltaX: 0,
      isBeingDragged: false,
      rotation: 0,
      position: props.position,
      transformOrigin: {
        x: 50,
        y: 10
      },
      width: 0
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
    const clientRect = node.getBoundingClientRect(),
          parentRect = node.offsetParent.getBoundingClientRect();

    const relativePositionX = event.clientX - clientRect.left,
          relativePositionY = event.clientY - clientRect.top;

    const height = clientRect.bottom - clientRect.top,
          width = clientRect.right - clientRect.left;

    const transformOrigin = {
      x: Math.round(relativePositionX / width * 100),
      y: Math.round(relativePositionY / height * 100)
    };

    this.setState({
      isBeingDragged: true,
      previousPosition: {
        x: position.x,
        y: position.y
      },
      draggingPosition: {
        x: clientRect.left - parentRect.left + node.offsetParent.scrollLeft,
        y: clientRect.top - parentRect.top + node.offsetParent.scrollTop
      },
      transformOrigin,
      width
    });
  }

  handleDragMove (event, { deltaX, deltaY }) {
    this.setState(({ draggingPosition = {}}) => ({
      deltaX,
      draggingPosition: {
        x: draggingPosition.x + deltaX,
        y: draggingPosition.y + deltaY
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
      deltaX: 0,
      isBeingDragged: false,
      previousPosition: null
    });
  }

  render () {
    const { classes, isDisabled, children, usePhysics } = this.props;
    const { draggingPosition, isBeingDragged, transformOrigin, deltaX } = this.state;
    let { position } = this.props;

    const componentClasses = classNames(classes.Container, {
      [this.props.classNames.IsDragging]: isBeingDragged
    });

    if (draggingPosition) {
      position = draggingPosition;
    }

    return (
      <Spring native={ true } to={{ deltaX }} config={{ tension: 200, friction: 18 }}>
        {props => (
          <DraggableCore
            disabled={ isDisabled }
            onStart={ this.handleDragStart }
            onDrag={ this.handleDragMove }
            onStop={ this.handleDragStop }
          >
            <animated.div
              className={ componentClasses }
              style={{
                transform: props.deltaX.interpolate({ range: [ -120, 120 ], output: [ -20, 20 ]}).
                  interpolate(rotation => `translate3d(${position.x}px, ${position.y}px, 0px) rotate(${usePhysics ? rotation : 0}deg)`),
                transformOrigin: `${transformOrigin.x}% ${transformOrigin.y}%`
              }}
            >
              { children }
            </animated.div>
          </DraggableCore>
        )}
      </Spring>
    );
  }
}

Draggable.defaultProps = {
  isDisabled: false,
  classNames: {
    IsDragging: 'IsDragging'
  },
  position: { x: 0, y: 0 },
  usePhysics: true,
  onMoveEnd () {}
};

Draggable.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  position: PropTypes.object.isRequired,
  classNames: PropTypes.object,
  usePhysics: PropTypes.bool,
  onMoveEnd: PropTypes.func
};

export default withStyles(styles)(Draggable);
