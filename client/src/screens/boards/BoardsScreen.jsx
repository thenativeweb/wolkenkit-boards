import api from '../../actions/api';
import eventbus from '../../services/eventbus';
import MountBoardDialog from './MountBoardDialog.jsx';
import mountBoardDialog from '../../actions/mountBoardDialog';
import { observer } from 'mobx-react';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import services from '../../services';
import state from '../../state';
import styles from './BoardsScreen.css';
import { List, ListItem, NonIdealState } from '../../components';

class BoardsScreen extends React.Component {
  static handleMountClicked (event) {
    event.preventDefault();

    mountBoardDialog.show();
  }

  static handleError (error) {
    services.overlay.alert({
      text: error.message
    });
  }

  constructor (props) {
    super(props);

    this.handleContextMenuClicked = this.handleContextMenuClicked.bind(this);
    this.handleContextMenuItemSelected = this.handleContextMenuItemSelected.bind(this);

    this.unsubscribe = undefined;
  }

  componentDidMount () {
    api.boards.readAndObserve().
      then(cancel => {
        this.unsubscribe = cancel;
      });
  }

  componentWillUnmount () {
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
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
            api.board.discard({
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
    return (
      <div className={ styles.BoardsScreen }>
        <List className={ styles.List }>
          <List.Header>
            <ListItem
              type='add'
              label='Mount new board'
              onClick={ BoardsScreen.handleMountClicked }
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

        <MountBoardDialog />
      </div>
    );
  }
}

export default observer(BoardsScreen);
