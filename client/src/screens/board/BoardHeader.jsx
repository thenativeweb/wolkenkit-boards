import activeBoard from '../../actions/activeBoard';
import api from '../../actions/api';
import { observer } from 'mobx-react';
import React from 'react';
import services from '../../services';
import state from '../../state';
import styles from './BoardHeader.css';
import { Form, TextBox } from '../../components';

class BoardHeader extends React.Component {
  static handleTitleChanged (event) {
    activeBoard.adjustTitle(event.target.value);
  }

  static handleTitleBlur () {
    api.board.tryToRename({
      boardId: state.activeBoard.id,
      title: state.newBoardTitle
    }).
      catch(BoardHeader.handleError);
  }

  static handleError (error) {
    services.overlay.alert({
      text: error.message
    });
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
  }

  render () {
    if (state.newBoardTitle === undefined) {
      return null;
    }

    return (
      <Form className={ styles.Form } onSubmit={ this.handleFormSubmit }>
        <TextBox
          className={ styles.TextBox }
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
