import activeBoard from '../../state/activeBoard';
import backend from '../../state/backend';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './BoardHeader.css';
import { Form, services, TextBox } from 'thenativeweb-ux';

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

  async changeTitle () {
    const { history } = this.props;

    if (activeBoard.state.newTitle === undefined || activeBoard.state.newTitle === activeBoard.state.title) {
      return;
    }

    try {
      const renamedEvent = await backend.collaboration.board.rename({
        id: activeBoard.state.id,
        title: activeBoard.state.newTitle
      });

      history.replace(`/board/${renamedEvent.data.slug}`);
      activeBoard.stopEditingTitle();
    } catch (ex) {
      services.notifications.show({ type: 'error', text: ex.message });
    }
  }

  async handleTitleBlur () {
    await this.changeTitle();
  }

  async handleFormSubmit (event) {
    event.preventDefault();

    await this.changeTitle();
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
