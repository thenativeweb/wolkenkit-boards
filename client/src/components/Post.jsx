import anime from 'animejs';
import Button from './Button.jsx';
import classNames from 'classnames';
import { DraggableCore } from 'react-draggable';
import EditableText from './EditableText.jsx';
import eventbus from '../services/eventbus';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Post.css';

class Post extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleElementRefChanged = this.handleElementRefChanged.bind(this);
    this.handleImageRefChanged = this.handleImageRefChanged.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    // this.handleEditingStarted = this.handleEditingStarted.bind(this);
    this.handleTextEdited = this.handleTextEdited.bind(this);
    // this.handleEditingStopped = this.handleEditingStopped.bind(this);
    // this.handleTextChanged = this.handleTextChanged.bind(this);
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
    /*
    * If the backend has save the new values after a move, a new position
    * will be passed down. Then it's time to remove the dragging values.
    */
    if (prevProps.left !== this.props.left || prevProps.top !== this.props.top) {
      this.setState({
        dragging: null
      });
    }
  }

  componentWillEnter (done) {
    anime({
      targets: this.element,
      opacity: [ 0, 1 ],
      scale: [ 1.4, 1 ],
      duration: () => anime.random(300, 400),
      easing: 'easeOutBack',
      complete: done
    });
  }

  componentWillLeave (done) {
    anime({
      targets: this.element,
      opacity: [ 1, 0 ],
      translateY: [ 0, 40 ],
      duration: () => anime.random(300, 600),
      easing: 'easeOutExpo',
      complete: done
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

  // handleTextChanged (newText) {
  //   if (newText.includes(':)') || newText.includes(':-)')) {
  //     this.props.onColorChange(this.props.id, 'green');
  //   } else if (newText.includes(':(') || newText.includes(':-(')) {
  //     this.props.onColorChange(this.props.id, 'red');
  //   }
  // }

  handleTextEdited (newText) {
    this.props.onEdit(this.props.id, newText);
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
    this.props.onFullscreenRequest({
      type: this.props.type,
      content: this.props.content,
      element: this.imageRef
    });
  }

  handleMenuItemSelected (id) {
    switch (id) {
      case 'markAsDone':
        this.props.onMarkAsDone(this.props.id);
        break;
      case 'throwAway':
        this.props.onThrowAway(this.props.id);
        break;
      default:
        break;
    }
  }

  handleDoubleClick () {
    switch (this.props.type) {
      case 'text':
        this.props.onEditingStarted(this.props.id);
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
      rotation: `rotate(${(deltaX * 0.2)}deg)`,
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
      rotation: null,
      isBeingDragged: false,
      previousPosition: null
    });
  }

  renderTextContent () {
    return (
      <EditableText
        className={ styles.Content }
        initialText={ this.props.content }
        isEditing={ this.props.isEditing }
        onChange={ this.handleTextChanged }
        onBlur={ this.props.onEditingStopped }
        onEdited={ this.handleTextEdited }
      />
    );
  }

  renderImageContent () {
    return (
      <div className={ styles.Content }>
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
    const menuButton = (
      <div className={ styles.MetaButton }>
        <Button
          type='context-menu'
          icon='context-menu'
          iconSize='s'
          onClick={ this.handleContextMenuButtonClicked }
        />
      </div>
    );

    let fullScreenButton = null;

    if (type === 'image') {
      fullScreenButton = (
        <div className={ styles.MetaButton }>
          <Button
            icon='fullscreen'
            iconSize='s'
            onClick={ this.handleFullscreenButtonPressed }
          />
        </div>
      );
    }

    return (
      <div className={ styles.Meta }>
        <div className={ styles.Author }><span>by</span> {this.props.creator}</div>
        {fullScreenButton}
        {menuButton}
      </div>
    );
  }

  render () {
    const { color, isDone, left, top, type, isEditing } = this.props;
    const { dragging, isBeingDragged, rotation } = this.state;

    const postClasses = classNames(styles.Post, {
      [styles.IsEditing]: isEditing,
      [styles.IsDragging]: isBeingDragged,
      [styles.IsDone]: isDone,
      [styles.ColorGreen]: color === 'green',
      [styles.ColorPaperLined]: color === 'paper-lined',
      [styles.ColorRed]: color === 'red',
      [styles.ColorYellow]: color === 'yellow',
      [styles.PostTypeImage]: type === 'image',
      [styles.PostTypeText]: type === 'text'
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
      <DraggableCore
        disabled={ isEditing }
        onStart={ this.handleDragStart }
        onDrag={ this.handleDragMove }
        onStop={ this.handleDragStop }
      >
        <div
          className={ styles.Container }
          style={{ transform: `translate(${position.left}px, ${position.top}px)` }}
        >
          <div
            ref={ this.handleElementRefChanged }
            className={ classNames(postClasses) }
            data-type={ this.props.type }
            onDoubleClick={ this.handleDoubleClick }
            style={{ transform: rotation }}
          >
            {this.renderContent(type)}
            {this.renderMetaActions(type)}
          </div>
        </div>
      </DraggableCore>
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
  onColorChange () {},
  onEdit () {},
  onEditingStarted () {},
  onEditingStopped () {}
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
  onColorChange: PropTypes.func,
  onEdit: PropTypes.func,
  onEditingStarted: PropTypes.func,
  onEditingStopped: PropTypes.func,
  onFullscreenRequest: PropTypes.func,
  onMarkAsDone: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onThrowAway: PropTypes.func
};

export default Post;
