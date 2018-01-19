import backend from '../../state/backend';
import eventbus from '../../services/eventbus';
import mountBoardDialog from '../../state/mountBoardDialog';
import MountBoardDialog from './MountBoardDialog.jsx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import services from '../../services';
import styles from './BoardsScreen.css';
import { List, ListItem, NonIdealState } from '../../components';

class BoardsScreen extends React.Component {
  static handleContextMenuClicked (event) {
    event.preventDefault();
    event.stopPropagation();

    const items = [
      { id: 'discard-board', label: 'Discard board', data: event.currentTarget.getAttribute('data-id') }
    ];

    eventbus.emit('context-menu-open', {
      target: event.currentTarget,
      items,
      onItemSelected: BoardsScreen.handleContextMenuItemSelected
    });
  }

  static handleContextMenuItemSelected (id, data) {
    switch (id) {
      case 'discard-board':
        if (!data) {
          return;
        }

        services.dialog.confirm({
          title: 'Do you really want to discard this board?',
          cancel: 'Cancel',
          confirm: 'Discard it!',
          onConfirm: async () => {
            try {
              await backend.collaboration.board.discard({
                id: data
              });
            } catch (ex) {
              BoardsScreen.handleError(ex);
            }
          }
        });

        break;
      default:
        break;
    }
  }

  static handleError (error) {
    services.overlay.alert({
      text: error.message
    });
  }

  /* eslint-disable class-methods-use-this */
  async componentDidMount () {
    try {
      await backend.lists.boards.startReading();
    } catch (ex) {
      BoardsScreen.handleError(ex);
    }
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  componentWillUnmount () {
    backend.lists.boards.stopReading();
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  render () {
    return (
      <div className={ styles.BoardsScreen }>
        <List className={ styles.List }>
          <List.Header>
            <ListItem
              type='add'
              label='Mount new board'
              onClick={ () => mountBoardDialog.show() }
            />
          </List.Header>
          <NonIdealState when={ backend.state.lists === 0 }>
            You haven&lsquo;t created any board yet, go ahead and do so!
          </NonIdealState>
          <ReactTransitionGroup>
            { backend.state.lists.boards.map(board => (
              <ListItem
                type='link'
                data-id={ board.id }
                key={ board.slug }
                icon={ board.isPrivate ? 'lock' : null }
                to={ `/board/${board.slug}` }
                label={ board.title }
                onContextMenu={ BoardsScreen.handleContextMenuClicked }
              />
            ))}
          </ReactTransitionGroup>
        </List>

        <MountBoardDialog />
      </div>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default observer(BoardsScreen);
