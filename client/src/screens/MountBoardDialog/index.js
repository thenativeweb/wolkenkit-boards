import backend from '../../state/backend';
import mountBoardDialog from '../../state/mountBoardDialog';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, CheckBox, ControlGroup, Form, Headline, Modal, services, TextBox } from 'thenativeweb-ux';

const handleDialogCanceled = function () {
  mountBoardDialog.hide();
};

const handleFormSubmitted = async function (event) {
  event.preventDefault();

  const { title, isPrivate } = mountBoardDialog.state;

  try {
    const mountedEvent = await backend.collaboration.board.mount({ title });

    if (!isPrivate) {
      await backend.collaboration.board.share({ id: mountedEvent.aggregate.id });
    }

    mountBoardDialog.hide();
    services.notifications.show({ type: 'success', text: `Board "${mountedEvent.data.title}" has been mounted!` });
  } catch (ex) {
    services.notifications.show({ type: 'error', text: ex.message });
  }
};

const MountBoardDialog = () => (
  <Modal
    isVisible={ mountBoardDialog.state.isVisible }
    onCancel={ handleDialogCanceled }
  >
    <Form onSubmit={ handleFormSubmitted }>
      <Headline>Mount new board</Headline>
      <ControlGroup>
        <ControlGroup.Item>
          <TextBox
            className='add-boards-title'
            onChange={ event => mountBoardDialog.changeTitle(event.currentTarget.value) }
            value={ mountBoardDialog.state.title || '' }
            placeholder='Pick a title'
            autoFocus={ true }
          />
        </ControlGroup.Item>
      </ControlGroup>
      <ControlGroup>
        <ControlGroup.Item label='Just for myself'>
          <CheckBox
            checked={ mountBoardDialog.state.isPrivate }
            id='just-for-myself'
            onChange={ () => mountBoardDialog.togglePrivacy() }
          />
        </ControlGroup.Item>
      </ControlGroup>
      <Form.Actions type='stacked'>
        <Button isPrimary={ true } disabled={ mountBoardDialog.state.title === '' }>Mount it!</Button>
        <Button onClick={ handleDialogCanceled }>Cancel</Button>
      </Form.Actions>
    </Form>
  </Modal>
);

export default observer(MountBoardDialog);
