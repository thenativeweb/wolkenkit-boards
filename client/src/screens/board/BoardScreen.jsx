import activeBoard from '../../actions/activeBoard';
import activePost from '../../actions/activePost';
import menu from '../../actions/menu';
import { observer } from 'mobx-react';
import posts from '../../actions/post';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import services from '../../services';
import state from '../../state';
import styles from './BoardScreen.css';
import { ColorToggle, FileDropZone, MediaViewer, Post } from '../../components';

const POST_WIDTH = 180;

class BoardScreen extends React.Component {
  static handleFullscreenRequested (options) {
    services.mediaViewer.show({
      type: options.type,
      media: options.content,
      element: options.element
    });
  }

  static handleError (error) {
    services.overlay.alert({
      text: error.message
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

    activeBoard.noteText({
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
            id: notedEvent.aggregate.id,
            content: notedEvent.data.content
          });
        }, 300);
      }).
      catch(BoardScreen.handleError);
  }

  static handleImageNoted (images, coords) {
    activeBoard.noteImage({
      boardId: state.activeBoard.id,
      content: images[0],
      color: state.selectedPostColor,
      position: {
        left: coords.left - POST_WIDTH / 2,
        top: coords.top - POST_WIDTH / 2
      }
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostMove (postId, position) {
    posts.move({
      postId,
      position
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostColorChange (postId, color) {
    posts.recolor({
      postId,
      to: color
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostEditStart (editedPost) {
    activePost.startEditing({
      id: editedPost.id,
      content: editedPost.content
    });
  }

  static handlePostEdit (newText) {
    activePost.changeText(newText);
  }

  static handlePostEditEnd () {
    posts.edit({
      postId: state.activePostId,
      content: state.activePostContent
    }).
      then(() => {
        setTimeout(() => {
          activePost.stopEditing();
        }, 100);
      }).
      catch(BoardScreen.handleError);
  }

  static handlePostMarkAsDone (postId) {
    posts.markAsDone({
      postId
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostThrowAway (postId) {
    activeBoard.throwAwayPost({
      boardId: state.activeBoard.id,
      postId
    }).
      catch(BoardScreen.handleError);
  }

  static handleMainMenuClicked (id) {
    switch (id) {
      case 'board-clean-up':
        services.dialog.confirm({
          title: 'Remove all the posts from this board?',
          cancel: 'Cancel',
          confirm: 'Clear all posts!',
          onConfirm: () => {
            activeBoard.cleanUp().
              then(() => {
                menu.collapse();
              }).
              catch(BoardScreen.handleError);
          }
        });
        break;
      default:
        break;
    }
  }

  constructor (props) {
    super(props);

    this.subscriptions = [];
  }

  componentDidMount () {
    const { match, history } = this.props;

    activeBoard.readAndObserve(match.params.slug).
      then(cancel => {
        this.subscriptions.push(cancel);

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

    this.subscriptions.forEach(cancel => {
      cancel();
    });
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  render () {
    if (!state.activeBoard) {
      return null;
    }

    return (
      <div className={ styles.BoardScreen }>
        <FileDropZone onFileDropped={ BoardScreen.handleImageNoted }>
          <div className={ styles.Posts } onDoubleClick={ BoardScreen.handleDoubleClick }>
            <ReactTransitionGroup>
              {state.posts.map(post => (
                <Post
                  id={ post.id }
                  key={ post.id }
                  isEditing={ state.activePostId === post.id }
                  left={ post.position.left }
                  top={ post.position.top }
                  color={ post.color }
                  type={ post.type }
                  content={ state.activePostId === post.id ? state.activePostContent : post.content }
                  creator={ post.creator }
                  isDone={ post.isDone }
                  onMoveEnd={ BoardScreen.handlePostMove }
                  onColorChange={ BoardScreen.handlePostColorChange }
                  onEditStart={ BoardScreen.handlePostEditStart }
                  onEdit={ BoardScreen.handlePostEdit }
                  onEditEnd={ BoardScreen.handlePostEditEnd }
                  onMarkAsDone={ BoardScreen.handlePostMarkAsDone }
                  onThrowAway={ BoardScreen.handlePostThrowAway }
                  onFullscreenRequest={ BoardScreen.handleFullscreenRequested }
                />
              ))}
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
