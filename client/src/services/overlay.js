import eventbus from './eventbus';
import merge from 'lodash/merge';

const OverlayService = function () {
  this.isCurrentlyVisible = false;
  eventbus.on('overlay::alert::closed', this.handleAlertClosedEvent.bind(this));
};

OverlayService.prototype.alert = function (options) {
  if (!this.isCurrentlyVisible) {
    const alertOptions = merge({}, {
      text: '',
      onDismiss () {
        //
      },
      dismissAfter: 2000
    }, options);

    eventbus.emit('overlay::alert::show', alertOptions);
    this.isCurrentlyVisible = true;
  }
};

OverlayService.prototype.handleAlertClosedEvent = function () {
  this.isCurrentlyVisible = false;
};

export default new OverlayService();
