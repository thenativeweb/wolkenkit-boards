import activeBoard from '../../actions/activeBoard';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../../state';
import { Form, TextBox } from '../../components';

class BoardHeader extends React.Component {
  static handleTitleChanged (event) {
    activeBoard.adjustTitle(event.target.value);
  }

  static handleTitleBlur () {
    activeBoard.tryToRename(state.newBoardTitle);
  }

  constructor (props) {
    super(props);

    this.handleInputRefChanged = this.handleInputRefChanged.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputRefChanged (input) {
    this.headerTitleInput = input;
  }

  handleFormSubmit (event) {
    event.preventDefault();
    this.headerTitleInput.blur();

    activeBoard.tryToRename(state.newBoardTitle);
  }

  render () {
    if (state.newBoardTitle === undefined) {
      return null;
    }

    return (
      <Form onSubmit={ this.handleFormSubmit }>
        <TextBox
          autofocus={ false }
          ref={ this.handleInputRefChanged }
          type='dense'
          value={ state.newBoardTitle }
          onChange={ BoardHeader.handleTitleChanged }
          onBlur={ BoardHeader.handleTitleBlur }
        />
      </Form>
    );
  }
}

export default observer(BoardHeader);
