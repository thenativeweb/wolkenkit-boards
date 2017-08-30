import activeBoard from '../../actions/activeBoard';
import menu from '../../actions/menu';
import { observer } from 'mobx-react';
import post from '../../actions/post';
import React from 'react';
import services from '../../services';
import state from '../../state';
import { ColorToggle, MediaViewer, Posts, Screen } from '../../components';

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

  static handleTextNoted (event) {
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

  static handlePostMoved (postId, position) {
    post.move({
      postId,
      position
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostColorChanged (postId, color) {
    post.recolor({
      postId,
      to: color
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostEdited (postId, content) {
    post.edit({
      postId,
      content
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostMarkedAsDone (postId) {
    post.markAsDone({
      postId
    }).
      catch(BoardScreen.handleError);
  }

  static handlePostThrownAway (postId) {
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

    this.handleHeaderRefChange = this.handleHeaderRefChange.bind(this);

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

  handleHeaderRefChange (header) {
    this.header = header;
  }

  /* eslint-disable class-methods-use-this */
  render () {
    if (!state.activeBoard) {
      return null;
    }

    return (
      <Screen name='board'>
        <Posts
          posts={ state.posts }
          onTextNote={ BoardScreen.handleTextNoted }
          onImageNote={ BoardScreen.handleImageNoted }
          onMove={ BoardScreen.handlePostMoved }
          onColorChange={ BoardScreen.handlePostColorChanged }
          onEdit={ BoardScreen.handlePostEdited }
          onMarkAsDone={ BoardScreen.handlePostMarkedAsDone }
          onThrowAway={ BoardScreen.handlePostThrownAway }
          onFullscreenRequest={ BoardScreen.handleFullscreenRequested }
        />
        <ColorToggle
          colors={ state.postColors }
          selectedColor={ state.selectedPostColor }
          onChange={ BoardScreen.handleColorToggleChanged }
        />
        <MediaViewer />
      </Screen>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default observer(BoardScreen);
