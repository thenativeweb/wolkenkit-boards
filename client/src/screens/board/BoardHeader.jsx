import activeBoard from '../../actions/activeBoard';
import api from '../../actions/api';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../../state';
import styles from './BoardHeader.css';
import { Form, TextBox } from '../../components';

class BoardHeader extends React.Component {
  static handleTitleFocus () {
    activeBoard.startEditing(state.activeBoard.title);
  }

  static handleTitleChange (event) {
    activeBoard.changeTitle(event.target.value);
  }

  constructor (props) {
    super(props);

    this.handleInputRefChanged = this.handleInputRefChanged.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputRefChanged (input) {
    this.titleInput = input;
  }

  handleTitleBlur () {
    const { history } = this.props;

    api.board.tryToRename({
      boardId: state.activeBoard.id,
      title: state.newTitle
    }).
      then(event => {
        history.replace(`/board/${event.data.slug}`);
        activeBoard.stopEditing();
      });
  }

  handleFormSubmit (event) {
    event.preventDefault();
    this.titleInput.blur();
  }

  render () {
    if (!state.activeBoard) {
      return null;
    }

    return (
      <Form className={ styles.Form } onSubmit={ this.handleFormSubmit }>
        <TextBox
          className={ styles.TextBox }
          autofocus={ false }
          ref={ this.handleInputRefChanged }
          type='dense'
          value={ state.newTitle !== undefined ? state.newTitle : state.activeBoard.title }
          onFocus={ BoardHeader.handleTitleFocus }
          onChange={ BoardHeader.handleTitleChange }
          onBlur={ this.handleTitleBlur }
        />
      </Form>
    );
  }
}

export default observer(BoardHeader);
