import bus from './eventbus';

const MediaViewerService = function () {
  //
};

MediaViewerService.prototype.show = function (options) {
  if (!options.type) {
    throw new Error('Type is missing.');
  }
  if (!options.media) {
    throw new Error('Content is missing.');
  }

  bus.emit('mediaViewer::show', options);
};

export default new MediaViewerService();
