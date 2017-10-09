import { action } from 'mobx';
import services from '../../services';
import state from '../../state';

const noteText = action(options => {
  const { boardsApi } = services;

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

  if (!state.activeBoard || !state.activeBoard.id) {
    throw new Error('No board activated yet.');
  }

  return new Promise((resolve, reject) => {
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
      failed(err => reject(err));
  });
});

export default noteText;
