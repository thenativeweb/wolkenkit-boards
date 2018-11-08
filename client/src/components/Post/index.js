import anime from 'animejs';
import { Button } from 'thenativeweb-ux';
import classNames from 'classnames';
import { DraggableCore } from 'react-draggable';
import EditableText from '../EditableText';
import eventbus from '../../services/eventbus';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.js';
import { Transition } from 'react-transition-group';

const constrain = function (num, low, high) {
  return Math.max(Math.min(num, high), low);
};

const translateToRange = function (num, start1, stop1, start2, stop2, withinBounds) {
  const newval = (num - start1) / (stop1 - start1) * (stop2 - start2) + start2;

  if (!withinBounds) {
    return newval;
  }

  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  }

  return constrain(newval, stop2, start2);
};

class Post extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);

    this.handleElementRefChanged = this.handleElementRefChanged.bind(this);
    this.handleImageRefChanged = this.handleImageRefChanged.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleContextMenuButtonClicked = this.handleContextMenuButtonClicked.bind(this);
    this.handleFullscreenButtonPressed = this.handleFullscreenButtonPressed.bind(this);
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this);

    this.state = {
      isBeingEdited: false,
      isBeingDragged: false,
      rotation: 0,
      left: props.left,
      top: props.top
    };
  }

  componentDidUpdate (prevProps) {
    // If the backend has save the new values after a move, a new position
    // will be passed down. Then it's time to remove the dragging values.
    if (prevProps.left !== this.props.left || prevProps.top !== this.props.top) {
      this.setState({
        dragging: null
      });
    }
  }

  handleEnter () {
    anime({
      targets: this.element,
      opacity: [ 0, 1 ],
      scale: [ 1.4, 1 ],
      duration: 300,
      easing: 'easeOutBack'
    });
  }

  handleExit () {
    anime({
      targets: this.element,
      opacity: [ 1, 0 ],
      translateY: [ 0, 40 ],
      duration: 300,
      easing: 'easeOutExpo'
    });
  }

  handleElementRefChanged (element) {
    this.element = element;
  }

  handleImageRefChanged (image) {
    this.imageRef = image;
  }

  didMove (newPosition) {
    return this.state.previousPosition.left !== newPosition.left ||
           this.state.previousPosition.top !== newPosition.top;
  }

  handleContentChange (event) {
    const newText = event.target.value;

    const { id, color, onRecolor } = this.props;

    if (newText.includes(':)') || newText.includes(':-)')) {
      if (color !== 'green') {
        onRecolor(id, 'green');
      }
    } else if (newText.includes(':(') || newText.includes(':-(')) {
      if (color !== 'red') {
        onRecolor(this.props.id, 'red');
      }
    }

    this.props.onContentChange(newText);
  }

  handleContextMenuButtonClicked (event) {
    const items = [];

    if (!this.props.isDone) {
      items.push({ id: 'markAsDone', label: 'Mark as done' });
    }

    items.push({ id: 'throwAway', label: 'Throw away' });

    eventbus.emit('context-menu-open', {
      target: event.currentTarget,
      items,
      onItemSelected: this.handleMenuItemSelected
    });
  }

  handleFullscreenButtonPressed () {
    this.props.onRequestFullscreen({
      type: this.props.type,
      content: this.props.content,
      element: this.imageRef
    });
  }

  handleMenuItemSelected (menuId) {
    const { id, content, type, onMarkAsDone, onThrowAway } = this.props;

    switch (menuId) {
      case 'markAsDone':
        onMarkAsDone(id);
        break;
      case 'throwAway':
        onThrowAway({ id, content, type });
        break;
      default:
        break;
    }
  }

  handleDoubleClick () {
    const { id, content, type, onEditStart } = this.props;

    switch (type) {
      case 'text':
        onEditStart({ id, content, type });
        break;
      default:
        break;
    }
  }

  handleDragStart (event, data) {
    const { node } = data;
    const parentRect = node.offsetParent.getBoundingClientRect();
    const clientRect = node.getBoundingClientRect();

    this.setState({
      isBeingDragged: true,
      previousPosition: {
        left: this.props.left,
        top: this.props.top
      },
      dragging: {
        left: clientRect.left - parentRect.left + node.offsetParent.scrollLeft,
        top: clientRect.top - parentRect.top + node.offsetParent.scrollTop
      }
    });
  }

  handleDragMove (event, data) {
    const { deltaX, deltaY } = data;

    this.setState({
      rotation: translateToRange(deltaX, -120, 120, -20, 20),
      dragging: {
        left: this.state.dragging.left + deltaX,
        top: this.state.dragging.top + deltaY
      }
    });
  }

  handleDragStop () {
    if (this.didMove(this.state.dragging)) {
      this.props.onMoveEnd(this.props.id, {
        top: this.state.dragging.top,
        left: this.state.dragging.left
      });
    }

    this.setState({
      rotation: 0,
      isBeingDragged: false,
      previousPosition: null
    });
  }

  renderTextContent () {
    const { classes } = this.props;

    return (
      <EditableText
        className={ classes.Content }
        content={ this.props.content }
        isEditing={ this.props.isEditing }
        onChange={ this.handleContentChange }
        onBlur={ this.props.onEditEnd }
      />
    );
  }

  renderImageContent () {
    const { classes } = this.props;

    return (
      <div className={ classes.Content }>
        <img ref={ this.handleImageRefChanged } src={ this.props.content.url } />
      </div>
    );
  }

  renderContent (type) {
    let content;

    switch (type) {
      case 'text':
        content = this.renderTextContent();
        break;
      case 'image':
        content = this.renderImageContent();
        break;
      default:
        break;
    }

    return content;
  }

  renderMetaActions (type) {
    const { classes } = this.props;

    const menuButton = (
      <div className={ classes.MetaButton }>
        <Button
          icon='context-menu'
          iconSize='s'
          adjust='auto'
          onClick={ this.handleContextMenuButtonClicked }
        />
      </div>
    );

    let fullScreenButton = null;

    if (type === 'image') {
      fullScreenButton = (
        <div className={ classes.MetaButton }>
          <Button
            icon='fullscreen'
            iconSize='s'
            adjust='auto'
            onClick={ this.handleFullscreenButtonPressed }
          />
        </div>
      );
    }

    return (
      <div className={ classes.Meta }>
        <div className={ classes.Author }><span>by</span> {this.props.creator}</div>
        {fullScreenButton}
        {menuButton}
      </div>
    );
  }

  render () {
    const { classes, color, isDone, left, top, type, isEditing } = this.props;
    const { dragging, isBeingDragged, rotation } = this.state;

    const postClasses = classNames(classes.Post, {
      [classes.IsBeingEdited]: isEditing,
      [classes.IsDragging]: isBeingDragged,
      [classes.IsDone]: isDone,
      [classes.ColorGreen]: color === 'green',
      [classes.ColorPaperLined]: color === 'paper-lined',
      [classes.ColorRed]: color === 'red',
      [classes.ColorYellow]: color === 'yellow',
      [classes.TypeImage]: type === 'image',
      [classes.TypeText]: type === 'text'
    });

    const position = {
      left,
      top
    };

    if (dragging) {
      position.left = dragging.left;
      position.top = dragging.top;
    }

    return (
      <Transition
        key={ this.props.key }
        in={ this.props.in }
        mountOnEnter={ true }
        unmountOnExit={ true }
        onEnter={ this.handleEnter }
        onExit={ this.handleExit }
        timeout={ 400 }
      >
        <DraggableCore
          disabled={ isEditing }
          onStart={ this.handleDragStart }
          onDrag={ this.handleDragMove }
          onStop={ this.handleDragStop }
        >
          <div
            className={ classes.Container }
            style={{ transform: `translate(${position.left}px, ${position.top}px)` }}
          >
            <div
              ref={ this.handleElementRefChanged }
              className={ classNames(postClasses) }
              data-type={ this.props.type }
              onDoubleClick={ this.handleDoubleClick }
              style={{ transform: `rotate(${(rotation)}deg)` }}
            >
              {this.renderContent(type)}
              {this.renderMetaActions(type)}
            </div>
          </div>
        </DraggableCore>
      </Transition>
    );
  }
}

Post.defaultProps = {
  type: 'text',
  content: '',
  left: 0,
  top: 0,
  color: 'yellow',
  isDone: false,
  creator: '',
  onMoveEnd () {},
  onContentChange () {},
  onEditStart () {},
  onEditEnd () {},
  onRecolor () {},
  onRequestFullscreen () {},
  onThrowAway () {}
};

Post.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  creator: PropTypes.string,
  isEditing: PropTypes.bool,
  onContentChange: PropTypes.func,
  onEditEnd: PropTypes.func,
  onEditStart: PropTypes.func,
  onMarkAsDone: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onRecolor: PropTypes.func,
  onRequestFullscreen: PropTypes.func,
  onThrowAway: PropTypes.func
};

export default injectSheet(styles)(Post);
