import activePost from '../../actions/activePost';
import api from '../../actions/api';
import menu from '../../actions/menu';
import { observer } from 'mobx-react';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import services from '../../services';
import state from '../../state';
import styles from './BoardScreen.css';
import { ColorToggle, FileDropZone, MediaViewer, Post } from '../../components';

const POST_WIDTH = 192;

class BoardScreen extends React.Component {
  static handleRequestFullscreen (options) {
    services.mediaViewer.show({
      type: options.type,
      media: options.content,
      element: options.element
    });
  }

  static handleColorToggleChanged (newColor) {
    state.selectedPostColor = newColor;
  }

  static handleDoubleClick (event) {
    if (!event.target.classList.contains(styles.Posts)) {
      return;
    }

    const containerPosition = event.target.getBoundingClientRect();

    api.posts.noteText({
      boardId: state.activeBoard.id,
      content: 'New post',
      color: state.selectedPostColor,
      position: {
        left: event.clientX - containerPosition.left - POST_WIDTH / 2,
        top: event.clientY - containerPosition.top - POST_WIDTH / 2
      }
    }).
      then(notedEvent => {
        setTimeout(() => {
          activePost.startEditing({
            postId: notedEvent.aggregate.id,
            content: notedEvent.data.content
          });
        }, 300);
      });
  }

  static handleFileDrop (images, coords) {
    api.posts.noteImage({
      boardId: state.activeBoard.id,
      content: images[0],
      color: state.selectedPostColor,
      position: {
        left: coords.left - POST_WIDTH / 2,
        top: coords.top - POST_WIDTH / 2
      }
    });
  }

  static handlePostMoveEnd (postId, position) {
    api.posts.move({
      postId,
      position
    });
  }

  static handlePostRecolor (postId, color) {
    api.posts.recolor({
      postId,
      to: color
    });
  }

  static handlePostEditStart (editedPost) {
    activePost.startEditing({
      postId: editedPost.id,
      content: editedPost.content
    });
  }

  static handlePostContentChange (newContent) {
    activePost.changeContent(newContent);
  }

  static handlePostEditEnd () {
    api.posts.edit({
      postId: state.activePost.id,
      content: state.activePost.content
    }).
      then(() => {
        setTimeout(() => {
          activePost.stopEditing();
        }, 100);
      });
  }

  static handlePostMarkAsDone (postId) {
    api.posts.markAsDone({
      postId
    });
  }

  static handlePostThrowAway (postId) {
    api.posts.throwAway({
      postId
    });
  }

  static handleMainMenuClicked (id) {
    switch (id) {
      case 'board-clean-up':
        services.dialog.confirm({
          title: 'Remove all the posts from this board?',
          cancel: 'Cancel',
          confirm: 'Clear all posts!',
          onConfirm: () => {
            api.board.cleanUp({
              boardId: state.activeBoard.id
            }).
              then(() => {
                menu.collapse();
              });
          }
        });
        break;
      default:
        break;
    }
  }

  constructor (props) {
    super(props);

    this.unsubscribe = undefined;
  }

  componentDidMount () {
    const { match, history } = this.props;

    api.board.readAndObserve(match.params.slug).
      then(cancel => {
        this.unsubscribe = cancel;

        services.eventbus.on('main-menu::clicked', BoardScreen.handleMainMenuClicked);
      }).
      catch(() => {
        /* No board has been found so we redirect to root screen. */
        history.push('/');
      });
  }

  /* eslint-disable class-methods-use-this */
  componentWillUnmount () {
    services.eventbus.removeListener('main-menu::clicked', BoardScreen.handleMainMenuClicked);

    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  render () {
    if (!state.activeBoard) {
      return null;
    }

    return (
      <div className={ styles.BoardScreen }>
        <FileDropZone onDrop={ BoardScreen.handleFileDrop }>
          <div className={ styles.Posts } onDoubleClick={ BoardScreen.handleDoubleClick }>
            <ReactTransitionGroup>
              { state.posts.map(post => {
                const isEditing = state.activePost && state.activePost.id === post.id;

                return (
                  <Post
                    id={ post.id }
                    key={ post.id }
                    isEditing={ isEditing }
                    left={ post.position.left }
                    top={ post.position.top }
                    color={ post.color }
                    type={ post.type }
                    content={ isEditing ? state.activePost.content : post.content }
                    creator={ post.creator }
                    isDone={ post.isDone }
                    onMoveEnd={ BoardScreen.handlePostMoveEnd }
                    onRecolor={ BoardScreen.handlePostRecolor }
                    onEditStart={ BoardScreen.handlePostEditStart }
                    onContentChange={ BoardScreen.handlePostContentChange }
                    onEditEnd={ BoardScreen.handlePostEditEnd }
                    onMarkAsDone={ BoardScreen.handlePostMarkAsDone }
                    onThrowAway={ BoardScreen.handlePostThrowAway }
                    onRequestFullscreen={ BoardScreen.handleRequestFullscreen }
                  />
                );
              })}
            </ReactTransitionGroup>
          </div>
        </FileDropZone>

        <ColorToggle
          className={ styles.ColorToggle }
          colors={ state.postColors }
          selectedColor={ state.selectedPostColor }
          onChange={ BoardScreen.handleColorToggleChanged }
        />
        <MediaViewer />
      </div>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default observer(BoardScreen);
