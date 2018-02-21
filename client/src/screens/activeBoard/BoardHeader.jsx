import activeBoard from '../../state/activeBoard';
import backend from '../../state/backend';
import { observer } from 'mobx-react';
import React from 'react';
import services from '../../services';
import styles from './BoardHeader.css';
import { Form, TextBox } from '../../components';

class BoardHeader extends React.Component {
  static handleTitleFocus () {
    activeBoard.startEditingTitle(activeBoard.state.title);
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

  async handleTitleBlur () {
    const { history } = this.props;

    if (activeBoard.state.newTitle === activeBoard.state.title) {
      return;
    }

    try {
      const renamedEvent = await backend.collaboration.board.rename({
        id: activeBoard.state.id,
        title: activeBoard.state.newTitle
      });

      activeBoard.stopEditingTitle();
      history.replace(`/board/${renamedEvent.data.slug}`);
    } catch (ex) {
      if (ex.message === 'A board with this title already exists.') {
        activeBoard.changeTitle(activeBoard.state.title);
      }

      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  handleFormSubmit (event) {
    event.preventDefault();
    this.titleInput.blur();
  }

  render () {
    if (!activeBoard.state.id) {
      return null;
    }

    const isEditingTitle = activeBoard.state.newTitle !== undefined;

    return (
      <Form className={ styles.Form } onSubmit={ this.handleFormSubmit }>
        <TextBox
          className={ styles.TextBox }
          autofocus={ false }
          ref={ this.handleInputRefChanged }
          type='dense'
          value={ isEditingTitle ? activeBoard.state.newTitle || '' : activeBoard.state.title || '' }
          onFocus={ BoardHeader.handleTitleFocus }
          onChange={ BoardHeader.handleTitleChange }
          onBlur={ this.handleTitleBlur }
        />
      </Form>
    );
  }
}

export default observer(BoardHeader);
