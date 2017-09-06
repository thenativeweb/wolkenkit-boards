import boards from '../../actions/boards';
import eventbus from '../../services/eventbus';
import MountBoardForm from './MountBoardForm.jsx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import services from '../../services';
import state from '../../state';
import styles from './BoardsScreen.css';
import { Dialog, List, ListItem, NonIdealState } from '../../components';

class BoardsScreen extends React.Component {
  static handleError (error) {
    services.overlay.alert({
      text: error.message
    });
  }

  constructor (props) {
    super(props);

    this.handleContextMenuClicked = this.handleContextMenuClicked.bind(this);
    this.handleContextMenuItemSelected = this.handleContextMenuItemSelected.bind(this);

    this.handleBoardMounted = this.handleBoardMounted.bind(this);
    this.handleMountClicked = this.handleMountClicked.bind(this);
    this.handleMountBoardDialogCanceled = this.handleMountBoardDialogCanceled.bind(this);

    this.state = {
      mountDialogVisible: false
    };

    this.subscriptions = [];
  }

  componentDidMount () {
    boards.readAndObserve().
      then(cancel => {
        this.subscriptions.push(cancel);

        return boards.observeEvents();
      }).
      then(cancel => {
        this.subscriptions.push(cancel);
      }).
      catch(BoardsScreen.handleError);
  }

  componentWillUnmount () {
    this.subscriptions.forEach(cancel => {
      cancel();
    });
  }

  handleBoardMounted (event) {
    boards.tryToMount({
      title: event.title,
      isPrivate: event.isPrivate
    }).
      then(() => {
        this.setState({
          mountDialogVisible: false
        });
      }).
      catch(err => services.overlay.alert({ text: err.message }));
  }

  handleMountClicked (event) {
    event.preventDefault();

    this.setState({
      mountDialogVisible: true
    });
  }

  handleMountBoardDialogCanceled () {
    this.setState({
      mountDialogVisible: false
    });
  }

  handleContextMenuItemSelected (id, data) {
    switch (id) {
      case 'discard-board':
        if (!data) {
          return;
        }

        services.dialog.confirm({
          title: 'Do you really want to discard this board?',
          cancel: 'Cancel',
          confirm: 'Discard it!',
          onConfirm: () => {
            boards.discard({
              boardId: data
            }).
              then(() => {
                this.setState({
                  boardToBeDiscarded: undefined,
                  discardDialogVisible: false
                });
              }).
              catch(BoardsScreen.handleError);
          }
        });

        break;
      default:
        break;
    }
  }

  handleContextMenuClicked (event) {
    event.preventDefault();
    event.stopPropagation();

    const items = [
      { id: 'discard-board', label: 'Discard board', data: event.currentTarget.getAttribute('data-id') }
    ];

    eventbus.emit('context-menu-open', {
      target: event.currentTarget,
      items,
      onItemSelected: this.handleContextMenuItemSelected
    });
  }

  render () {
    const { mountDialogVisible } = this.state;

    return (
      <div className={ styles.BoardsScreen }>
        <List className={ styles.List }>
          <List.Header>
            <ListItem
              type='add'
              label='Mount new board'
              onClick={ this.handleMountClicked }
            />
          </List.Header>
          <NonIdealState when={ state.boards.length === 0 }>
            You haven&lsquo;t created any board yet, go ahead and do so!
          </NonIdealState>
          <ReactTransitionGroup>
            { state.boards.map(board => (
              <ListItem
                type='link'
                data-id={ board.id }
                key={ board.slug }
                icon={ board.isPrivate ? 'lock' : null }
                to={ `/board/${board.slug}` }
                label={ board.title }
                onContextMenu={ this.handleContextMenuClicked }
              />
            ))}
          </ReactTransitionGroup>
        </List>
        <Dialog
          isVisible={ mountDialogVisible }
          onCancel={ this.handleMountBoardDialogCanceled }
        >
          <MountBoardForm
            onMountBoard={ this.handleBoardMounted }
            onCancel={ this.handleMountBoardDialogCanceled }
          />
        </Dialog>
      </div>
    );
  }
}

export default observer(BoardsScreen);
