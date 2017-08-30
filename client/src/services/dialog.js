import eventbus from './eventbus';
import merge from 'lodash/merge';

const DialogService = function () {
  this.isVisible = false;
  eventbus.on('dialog::confirm::canceled', this.handleCanceled.bind(this));
  eventbus.on('dialog::confirm::confirmed', this.handleConfirmed.bind(this));
};

DialogService.prototype.confirm = function (options) {
  if (!options.onConfirm) {
    throw new Error('onConfirm is missing.');
  }

  if (!this.isVisible) {
    const confirmOptions = merge({}, {
      title: 'Do you really?',
      confirm: 'Yes, make it so!',
      cancel: 'Cancel',
      onCancel () {
        //
      },
      onConfirm () {
        //
      }
    }, options);

    eventbus.emit('dialog::confirm::show', confirmOptions);
    this.isVisible = true;
  }
};

DialogService.prototype.handleCanceled = function () {
  this.isVisible = false;
};
DialogService.prototype.handleConfirmed = function () {
  this.isVisible = false;
};

export default new DialogService();
