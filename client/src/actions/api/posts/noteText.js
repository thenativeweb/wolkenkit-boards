import { action } from 'mobx';
import services from '../../../services';

const noteText = action(options => {
  const { boardsApi, overlay } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.boardId) {
    throw new Error('Board id is missing.');
  }
  if (!options.content) {
    throw new Error('content is missing.');
  }
  if (!options.color) {
    throw new Error('Color is missing.');
  }
  if (!options.position || !options.position.left || !options.position.top) {
    throw new Error('Position is missing.');
  }

  const { boardId, content, color, position } = options;

  return new Promise(resolve => {
    boardsApi.collaboration.
      post().
      note({
        boardId,
        type: 'text',
        content,
        color,
        position
      }).
      await('noted', event => {
        resolve(event);
      }).
      failed(err => {
        overlay.alert({
          text: err.message
        });
      });
  });
});

export default noteText;
