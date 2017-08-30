import boards from '../../actions/boards';
import eventbus from '../../services/eventbus';
import { Link } from 'react-router-dom';
import MountBoardForm from './MountBoardForm.jsx';
import { observer } from 'mobx-react';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import services from '../../services';
import state from '../../state';
import { Button, Dialog, Icon, Label, List, NonIdealState, Screen } from '../../components';

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

  /* eslint-disable class-methods-use-this */
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
  /* eslint-enable class-methods-use-this */

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
      <Screen name='boards'>
        <List>
          <List.Header>
            <List.Item type='add'>
              <Button icon='add' iconSize='medium' onClick={ this.handleMountClicked }>
                Mount new board
              </Button>
            </List.Item>
          </List.Header>
          <NonIdealState when={ state.boards.length === 0 }>
            You haven&lsquo;t created any board yet, go ahead and do so!
          </NonIdealState>
          <ReactTransitionGroup>
            { state.boards.map(board => (
              <List.Item type='link' key={ board.slug }>
                <Link to={ `/board/${board.slug}` }>
                  { board.isPrivate ? <Icon name='lock' size='small' /> : null }
                  <Label>{ board.title }</Label>
                  <Button
                    type='context-menu'
                    icon='context-menu'
                    iconSize='medium'
                    data-id={ board.id }
                    onClick={ this.handleContextMenuClicked }
                  />
                  <Icon name='arrow-east' size='small' />
                </Link>
              </List.Item>
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
      </Screen>
    );
  }
}

export default observer(BoardsScreen);
