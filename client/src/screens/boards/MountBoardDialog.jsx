import backend from '../../state/backend';
import mountBoardDialog from '../../state/mountBoardDialog';
import { observer } from 'mobx-react';
import React from 'react';
import services from '../../services';
import state from '../../state';
import { Button, Dialog, Form, TextBox } from '../../components';

const handleDialogCanceled = function () {
  mountBoardDialog.hide();
};

const handleFormSubmitted = async function (event) {
  event.preventDefault();

  const { title, isPrivate } = mountBoardDialog.state;

  try {
    const mountedEvent = await backend.collaboration.board.mount({
      title,
      isPrivate
    });

    if (!isPrivate) {
      await backend.collaboration.board.share({ id: mountedEvent.aggregate.id });
    }

    mountBoardDialog.hide();
  } catch (ex) {
    services.overlay.alert({ text: ex.message });
  }
};

const MountBoardDialog = () => (
  <Dialog
    isVisible={ mountBoardDialog.state.isVisible }
    onCancel={ handleDialogCanceled }
  >
    <Form onSubmit={ handleFormSubmitted }>
      <Form.Row type='message'>
        Mount new board
      </Form.Row>
      <Form.Row>
        <TextBox
          className='add-boards-title'
          onChange={ event => mountBoardDialog.changeTitle(event.currentTarget.value) }
          value={ mountBoardDialog.state.title || '' }
          placeholder='Pick a title'
        />
      </Form.Row>
      <Form.Row horizontalContentAlign='left' verticalContentAlign='center'>
        <input
          checked={ mountBoardDialog.state.isPrivate }
          type='checkbox'
          id='just-for-myself'
          onChange={ () => mountBoardDialog.togglePrivacy() }
        />
        <label htmlFor='just-for-myself'>Just for myself</label>
      </Form.Row>
      <Form.Row type='action-buttons'>
        <Button type='primary' disabled={ state.mountBoardDialog.title === '' }>Mount it!</Button>
        <Button onClick={ handleDialogCanceled }>Cancel</Button>
      </Form.Row>
    </Form>
  </Dialog>
);

export default observer(MountBoardDialog);
