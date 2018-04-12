import activeBoard from '../../state/activeBoard';
import backend from '../../state/backend';
import menu from '../../state/menu';
import { observer } from 'mobx-react';
import React from 'react';
import services from '../../services';
import styles from './ActiveBoardScreen.css';
import { TransitionGroup } from 'react-transition-group';
import { ColorToggle, FileDropZone, MediaViewer, Post } from '../../components';

const postWidth = 192;

class ActiveBoardScreen extends React.Component {
  static handleRequestFullscreen (options) {
    services.mediaViewer.show({
      type: options.type,
      media: options.content,
      element: options.element
    });
  }

  static async handleDoubleClick (event) {
    if (!event.target.classList.contains(styles.Posts)) {
      return;
    }

    const containerPosition = event.target.getBoundingClientRect();

    try {
      const notedEvent = await backend.collaboration.post.noteText({
        boardId: activeBoard.state.id,
        content: 'New post',
        color: activeBoard.state.selectedPostColor,
        position: {
          left: event.clientX - containerPosition.left - postWidth / 2,
          top: event.clientY - containerPosition.top - postWidth / 2
        }
      });

      await activeBoard.startEditingPost(notedEvent.aggregate.id);
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  static async handleFileDrop (images, coords) {
    if (!images[0]) {
      return;
    }

    try {
      await backend.collaboration.post.noteImage({
        boardId: activeBoard.state.id,
        color: activeBoard.state.selectedPostColor,
        content: images[0],
        position: {
          left: coords.left - postWidth / 2,
          top: coords.top - postWidth / 2
        }
      });
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  static async handlePostMoveEnd (id, position) {
    try {
      await backend.collaboration.post.move({
        id,
        position
      });
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  static async handlePostRecolor (id, to) {
    try {
      await backend.collaboration.post.recolor({
        id,
        to
      });
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  static handlePostEditStart (editedPost) {
    activeBoard.startEditingPost(editedPost.id);
  }

  static handlePostContentChange (content) {
    activeBoard.changeActivePost(content);
  }

  static async handlePostEditEnd () {
    try {
      await backend.collaboration.post.edit({
        id: activeBoard.state.activePost.id,
        content: activeBoard.state.activePost.content
      });
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    } finally {
      setTimeout(() => {
        activeBoard.stopEditingPost();
      }, 100);
    }
  }

  static async handlePostMarkAsDone (id) {
    try {
      await backend.collaboration.post.markAsDone({
        id
      });
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  static async handlePostThrowAway (postId) {
    try {
      await backend.collaboration.board.removePost({
        id: activeBoard.state.id,
        postId
      });
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  static async handleMainMenuClicked (id) {
    switch (id) {
      case 'board-clean-up': {
        // const didConfirm = await services.dialog.confirm({
        //   title: 'Remove all posts from this board?',
        //   confirm: 'Clear all posts!'
        // });

        const chosenAction = await services.dialogs.confirm({
          title: 'Remove all posts from this board?',
          actions: {
            confirm: 'Clear all posts!',
            cancel: 'Cancel'
          }
        });

        if (chosenAction === 'cancel') {
          return;
        }

        try {
          await backend.collaboration.board.cleanUp({
            id: activeBoard.state.id
          });
        } catch (ex) {
          services.notifications.show({ type: 'error', text: ex.message });
        }

        menu.collapse();
        break;
      }
      default:
        break;
    }
  }

  constructor (props) {
    super(props);

    this.stopReading = undefined;
  }

  async componentDidMount () {
    const { match } = this.props;

    await this.startReadingBoard(match.params.slug);

    menu.registerItems([
      { label: 'Clean up board', id: 'board-clean-up', onSelect: ActiveBoardScreen.handleMainMenuClicked }
    ]);
  }

  async componentDidUpdate (prevProps) {
    const { match } = this.props;
    const newSlug = match.params.slug;

    if (newSlug !== prevProps.match.params.slug) {
      this.stopReadingBoard();

      await this.startReadingBoard(newSlug);
    }
  }

  componentWillUnmount () {
    this.stopReadingBoard();

    menu.clearItems();
  }

  async startReadingBoard (slug) {
    if (!slug) {
      throw new Error('Slug is missing.');
    }

    const { history } = this.props;

    try {
      this.stopReading = await activeBoard.startReading(slug);
    } catch (ex) {
      // No board has been found so we redirect to root screen.
      history.push('/');
    }
  }

  stopReadingBoard () {
    if (typeof this.stopReading === 'function') {
      this.stopReading();
    }
  }

  /* eslint-disable class-methods-use-this */
  render () {
    if (!activeBoard.state.id) {
      return null;
    }

    const activePostId = activeBoard.state.activePost && activeBoard.state.activePost.id;

    return (
      <div className={ styles.ActiveBoardScreen }>
        <FileDropZone onDrop={ ActiveBoardScreen.handleFileDrop }>
          <div className={ styles.Posts } onDoubleClick={ ActiveBoardScreen.handleDoubleClick }>
            <TransitionGroup>
              { activeBoard.state.posts.map(post => {
                const isEditing = activePostId === post.id;

                return (
                  <Post
                    id={ post.id }
                    key={ post.id }
                    isEditing={ isEditing }
                    left={ post.position.left }
                    top={ post.position.top }
                    color={ post.color }
                    type={ post.type }
                    content={ !isEditing ? post.content : activeBoard.state.activePost.content }
                    creator={ post.creator }
                    isDone={ post.isDone }
                    onMoveEnd={ ActiveBoardScreen.handlePostMoveEnd }
                    onRecolor={ ActiveBoardScreen.handlePostRecolor }
                    onEditStart={ ActiveBoardScreen.handlePostEditStart }
                    onContentChange={ ActiveBoardScreen.handlePostContentChange }
                    onEditEnd={ ActiveBoardScreen.handlePostEditEnd }
                    onMarkAsDone={ ActiveBoardScreen.handlePostMarkAsDone }
                    onThrowAway={ ActiveBoardScreen.handlePostThrowAway }
                    onRequestFullscreen={ ActiveBoardScreen.handleRequestFullscreen }
                  />
                );
              })}
            </TransitionGroup>
          </div>
        </FileDropZone>

        <ColorToggle
          className={ styles.ColorToggle }
          colors={ [ 'yellow', 'red', 'green', 'paper-lined' ] }
          selectedColor={ activeBoard.state.selectedPostColor }
          onChange={ color => activeBoard.selectPostColor(color) }
        />
        <MediaViewer />
      </div>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default observer(ActiveBoardScreen);
