import EventEmitter from 'events';
import merge from 'lodash/merge';

class DialogsService extends EventEmitter {
  constructor () {
    super();

    this.state = {
      confirm: {
        isVisible: false,
        title: '',
        actions: {
          cancel: '',
          confirm: ''
        },
        onCancel () {},
        onConfirm () {}
      }
    };
  }

  hideConfirm () {
    this.state = merge({}, this.state, {
      confirm: {
        isVisible: false,
        onCancel () {},
        onConfirm () {}
      }
    });
    this.emit('changed');
  }

  confirm (options) {
    return new Promise(resolve => {
      if (!options) {
        throw new Error('Options are missing.');
      }
      if (!options.title) {
        throw new Error('Title is missing.');
      }
      if (!options.actions) {
        throw new Error('Actions are missing.');
      }
      if (!options.actions.cancel) {
        throw new Error('Cancel is missing.');
      }
      if (!options.actions.confirm) {
        throw new Error('Confirm is missing.');
      }
      const { title, actions } = options;

      this.state = {
        confirm: {
          isVisible: true,
          title,
          actions,
          onConfirm: () => {
            this.hideConfirm();
            resolve('confirm');
          },
          onCancel: () => {
            this.hideConfirm();
            resolve('cancel');
          }
        }
      };

      // Delay the rendering in order to for keyboard events not to conflict
      setTimeout(() => {
        this.emit('changed');
      }, 100);
    });
  }
}

export default DialogsService;
