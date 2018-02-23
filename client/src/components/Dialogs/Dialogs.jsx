import Button from '../Button';
import Headline from '../Headline';
import Modal from '../Modal';
import React from 'react';
import services from '../../services';
import styles from './styles.css';

const KEY = {
  ENTER: 13,
  ESCAPE: 27
};

class Dialogs extends React.PureComponent {
  constructor () {
    super();

    this.state = {
      isVisible: false
    };

    this.handleServiceChanged = this.handleServiceChanged.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount () {
    services.dialogs.on('changed', this.handleServiceChanged);
  }

  componentWillUnount () {
    services.dialogs.removeListener('changed', this.handleServiceChanged);
  }

  handleServiceChanged () {
    this.forceUpdate();
  }

  /* eslint-disable class-methods-use-this */
  handleCancel () {
    services.dialogs.state.confirm.onCancel();
  }

  handleConfirm () {
    services.dialogs.state.confirm.onConfirm();
  }

  handleKeyDown (key) {
    switch (key) {
      case KEY.ESCAPE:
        services.dialogs.state.confirm.onCancel();
        break;
      case KEY.ENTER:
        services.dialogs.state.confirm.onConfirm();
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <Modal
        attach='center'
        isVisible={ services.dialogs.state.confirm.isVisible }
        className={ styles.Dialogs }
        onKeyDown={ this.handleKeyDown }
      >
        <Headline>
          { services.dialogs.state.confirm.title }
        </Headline>
        <div className={ styles.Actions }>
          <Button adjust='auto' onClick={ this.handleCancel }>
            { services.dialogs.state.confirm.actions.cancel }
          </Button>
          <Button adjust='flex' onClick={ this.handleConfirm } isPrimary={ true } autoFocus={ true }>
            { services.dialogs.state.confirm.actions.confirm }
          </Button>
        </div>
      </Modal>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default Dialogs;
