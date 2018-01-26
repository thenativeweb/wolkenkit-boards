import backend from '../../state/backend';
import mountBoardDialog from '../../state/mountBoardDialog';
import MountBoardDialog from '../mountBoardDialog/MountBoardDialog.jsx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import services from '../../services';
import styles from './BoardsScreen.css';
import { List, ListItem, NonIdealState } from '../../components';

class BoardsScreen extends React.Component {
  static async handleContextMenuItemSelected (id, data) {
    switch (id) {
      case 'discard-board': {
        if (!data) {
          return;
        }

        const didConfirm = await services.dialog.confirm({
          title: 'Do you really want to discard this board?',
          confirm: 'Discard it!'
        });

        if (!didConfirm) {
          return;
        }

        try {
          await backend.collaboration.board.discard({
            id: data
          });
        } catch (ex) {
          services.overlay.alert({ text: ex.message });
        }
        break;
      }
      default:
        break;
    }
  }

  /* eslint-disable class-methods-use-this */
  async componentDidMount () {
    try {
      await backend.lists.boards.startReading();
    } catch (ex) {
      services.overlay.alert({ text: ex.message });
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
          <NonIdealState when={ backend.state.lists.boards.length === 0 }>
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
                secondaryActions={ [{ id: 'discard-board', label: 'Discard board', data: board.id }] }
                onSecondaryAction={ BoardsScreen.handleContextMenuItemSelected }
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
