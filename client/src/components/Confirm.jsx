import eventbus from '../services/eventbus';
import React from 'react';
import { Button, Dialog, Form } from './index';

class Confirm extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleShowEvent = this.handleShowEvent.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

    this.state = {
      isVisible: false,
      title: 'Do you really?',
      confirm: 'Yes, make it so!',
      cancel: 'Cancel',
      onCancel () {},
      onConfirm () {}
    };
  }

  componentDidMount () {
    eventbus.on('dialog::confirm::show', this.handleShowEvent);
  }

  componentWillUnmount () {
    eventbus.off('dialog::confirm::show', this.handleShowEvent);
  }

  handleShowEvent (options) {
    this.setState({
      isVisible: true,
      title: options.title,
      cancel: options.cancel,
      confirm: options.confirm,
      onCancel: options.onCancel,
      onConfirm: options.onConfirm
    });
  }

  handleCancel () {
    if (typeof this.state.onCancel === 'function') {
      this.state.onCancel();
    }

    this.setState({
      isVisible: false,
      title: undefined,
      cancel: undefined,
      confirm: undefined,
      onCancel: undefined,
      onConfirm: undefined
    });
  }

  handleConfirm () {
    if (typeof this.state.onConfirm === 'function') {
      this.state.onConfirm();
    }

    this.setState({
      isVisible: false,
      title: undefined,
      cancel: undefined,
      confirm: undefined,
      onCancel: undefined,
      onConfirm: undefined
    });
  }

  render () {
    return (
      <Dialog
        type='sidebar-left'
        isVisible={ this.state.isVisible }
        onCancel={ this.handleCancel }
      >
        <Form.Row type='message'>{ this.state.title }</Form.Row>
        <Form.Row type='action-buttons'>
          <Button
            type='primary'
            onClick={ this.handleConfirm }
          >{ this.state.confirm }
          </Button>
          <Button
            type='secondary'
            onClick={ this.handleCancel }
          >{ this.state.cancel }
          </Button>
        </Form.Row>
      </Dialog>
    );
  }
}

export default Confirm;
