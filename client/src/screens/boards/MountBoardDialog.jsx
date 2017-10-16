import api from '../../actions/api';
import mountBoardDialog from '../../actions/mountBoardDialog';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../../state';
import { Button, Dialog, Form, TextBox } from '../../components';

const handleTitleChanged = function (event) {
  mountBoardDialog.changeTitle(event.currentTarget.value);
};

const handleIsPrivateClicked = function () {
  mountBoardDialog.togglePrivacy();
};

const handleCancelClicked = function () {
  mountBoardDialog.hide();
};

const handleSubmit = function (event) {
  event.preventDefault();

  api.board.tryToMount({
    title: state.mountBoardDialog.title,
    isPrivate: state.mountBoardDialog.isPrivate
  }).
    then(() => {
      mountBoardDialog.hide();
    });
};

const MountBoardDialog = () => (
  <Dialog
    isVisible={ state.mountBoardDialog.isVisible }
    onCancel={ handleCancelClicked }
  >
    <Form onSubmit={ handleSubmit }>
      <Form.Row type='message'>
        Mount new board
      </Form.Row>
      <Form.Row>
        <TextBox
          className='add-boards-title'
          onChange={ handleTitleChanged }
          value={ state.mountBoardDialog.title || '' }
          placeholder='Pick a title'
        />
      </Form.Row>
      <Form.Row horizontalContentAlign='left' verticalContentAlign='center'>
        <input
          checked={ state.mountBoardDialog.isPrivate }
          type='checkbox'
          id='just-for-myself'
          onChange={ handleIsPrivateClicked }
        />
        <label htmlFor='just-for-myself'>Just for myself</label>
      </Form.Row>
      <Form.Row type='action-buttons'>
        <Button type='primary' disabled={ state.mountBoardDialog.title === '' }>Mount it!</Button>
        <Button onClick={ handleCancelClicked }>Cancel</Button>
      </Form.Row>
    </Form>
  </Dialog>
);

export default observer(MountBoardDialog);
