import eventbus from './eventbus';
import merge from 'lodash/merge';

const DialogService = function () {
  this.isVisible = false;
};

DialogService.prototype.confirm = async function (options) {
  return new Promise(resolve => {
    if (!this.isVisible) {
      const confirmOptions = merge({}, {
        title: 'Do you really?',
        confirm: 'Yes, make it so!',
        cancel: 'Cancel',
        onCancel: () => {
          this.isVisible = false;
          resolve(false);
        },
        onConfirm: () => {
          this.isVisible = false;
          resolve(true);
        }
      }, options);

      eventbus.emit('dialog::confirm::show', confirmOptions);
      this.isVisible = true;
    }
  });
};

export default new DialogService();
