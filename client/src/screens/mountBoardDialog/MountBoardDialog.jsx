import backend from '../../state/backend';
import mountBoardDialog from '../../state/mountBoardDialog';
import { observer } from 'mobx-react';
import React from 'react';
import services from '../../services';
import styles from './MountBoardDialog.css';
import { Button, Form, Headline, Modal, TextBox } from '../../components';

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
      <Form.Row>
        <TextBox
          className='add-boards-title'
          onChange={ event => mountBoardDialog.changeTitle(event.currentTarget.value) }
          value={ mountBoardDialog.state.title || '' }
          placeholder='Pick a title'
          autoFocus={ true }
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
        <Button className={ styles.MountButton } isPrimary={ true } adjust='flex' disabled={ mountBoardDialog.state.title === '' }>Mount it!</Button>
        <Button onClick={ handleDialogCanceled }>Cancel</Button>
      </Form.Row>
    </Form>
  </Modal>
);

export default observer(MountBoardDialog);
