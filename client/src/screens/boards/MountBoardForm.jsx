import activeBoard from '../../actions/activeBoard';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../../state';
import { Button, Form, TextBox } from '../../components';

const handleTitleChanged = function (event) {
  activeBoard.adjustTitle(event.currentTarget.value);
};

class MountBoardForm extends React.Component {
  constructor (props) {
    super(props);

    this.handleIsPrivateClicked = this.handleIsPrivateClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelClicked = this.handleCancelClicked.bind(this);

    this.state = {
      isPrivate: false,
      title: ''
    };
  }

  handleIsPrivateClicked () {
    this.setState({
      isPrivate: !this.state.isPrivate
    });
  }

  handleSubmit (event) {
    const { onMountBoard } = this.props;

    event.preventDefault();

    onMountBoard({
      title: state.newBoardTitle,
      isPrivate: this.state.isPrivate
    });
  }

  handleCancelClicked (event) {
    event.preventDefault();
    this.props.onCancel();
  }

  render () {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Row type='message'>
          Mount new board
        </Form.Row>
        <Form.Row>
          <TextBox
            className='add-boards-title'
            onChange={ handleTitleChanged }
            value={ state.newBoardTitle || '' }
            placeholder='Pick a title'
          />
        </Form.Row>
        <Form.Row horizontalContentAlign='left' verticalContentAlign='center'>
          <input
            checked={ this.state.isPrivate }
            type='checkbox'
            id='just-for-myself'
            onClick={ this.handleIsPrivateClicked }
          />
          <label htmlFor='just-for-myself'>Just for myself</label>
        </Form.Row>
        <Form.Row type='action-buttons'>
          <Button type='primary' disabled={ this.state.title === '' }>Mount it!</Button>
          <Button onClick={ this.handleCancelClicked }>Cancel</Button>
        </Form.Row>
      </Form>
    );
  }
}

export default observer(MountBoardForm);
