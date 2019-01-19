import Draggable from '../Draggable';
import EditableText from '../EditableText';
import eventbus from '../../services/eventbus';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.js';
import { Transition } from 'react-transition-group';
import { animate, Button } from 'thenativeweb-ux';
import { classNames, withStyles } from 'thenativeweb-ux/dist/styles';

class Post extends React.PureComponent {
  constructor (props) {
    super(props);

    this.imageRef = React.createRef();
    this.elementRef = React.createRef();

    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleDragMoveEnd = this.handleDragMoveEnd.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleContextMenuButtonClicked = this.handleContextMenuButtonClicked.bind(this);
    this.handleFullscreenButtonPressed = this.handleFullscreenButtonPressed.bind(this);
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this);
  }

  handleEnter () {
    animate({
      targets: this.elementRef.current,
      opacity: [ 0, 1 ],
      scale: [ 1.4, 1 ],
      duration: 300,
      easing: 'easeOutBack'
    });
  }

  handleExit () {
    animate({
      targets: this.elementRef.current,
      opacity: [ 1, 0 ],
      translateY: [ 0, 40 ],
      duration: 300,
      easing: 'easeOutExpo'
    });
  }

  handleContentChange (event) {
    const newText = event.target.value;

    const { id, color, onContentChange, onRecolor } = this.props;

    if (newText.includes(':)') || newText.includes(':-)')) {
      if (color !== 'green') {
        onRecolor(id, 'green');
      }
    } else if (newText.includes(':(') || newText.includes(':-(')) {
      if (color !== 'red') {
        onRecolor(this.props.id, 'red');
      }
    }

    onContentChange(newText);
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
      element: this.imageRef.current
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

  handleDragMoveEnd (position) {
    this.props.onMoveEnd(this.props.id, {
      left: position.x,
      top: position.y
    });
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
    const {
      classes,
      color,
      content,
      isDone,
      left,
      top,
      type,
      isEditing,
      onEditEnd
    } = this.props;

    const postClasses = classNames(classes.Post, {
      [classes.IsBeingEdited]: isEditing,
      [classes.IsDone]: isDone,
      [classes.ColorGreen]: color === 'green',
      [classes.ColorPaperLined]: color === 'paper-lined',
      [classes.ColorRed]: color === 'red',
      [classes.ColorYellow]: color === 'yellow',
      [classes.TypeImage]: type === 'image',
      [classes.TypeText]: type === 'text'
    });

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
        <Draggable
          isDisabled={ isEditing }
          onMoveEnd={ this.handleDragMoveEnd }
          position={{ x: left, y: top }}
          classNames={{
            IsDragging: classes.IsDragging
          }}
        >
          <div
            ref={ this.elementRef }
            className={ classNames(postClasses) }
            data-type={ this.props.type }
            onDoubleClick={ this.handleDoubleClick }
          >
            {
              type === 'image' ?
                (
                  <div className={ classes.Content }>
                    <img ref={ this.imageRef } src={ content.url } />
                  </div>
                ) :
                null
            }
            {
              type === 'text' ?
                (
                  <EditableText
                    className={ classes.Content }
                    content={ content }
                    isEditing={ isEditing }
                    onChange={ this.handleContentChange }
                    onBlur={ onEditEnd }
                  />
                ) :
                null
            }
            {this.renderMetaActions(type)}
          </div>
        </Draggable>
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

export default withStyles(styles)(Post);
