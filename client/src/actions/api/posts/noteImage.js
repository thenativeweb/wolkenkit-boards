import { action } from 'mobx';
import services from '../../../services';
import storage from '../storage';

const noteText = action(options => {
  const { boardsApi, overlay } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.boardId) {
    throw new Error('Board id is missing.');
  }
  if (!options.content) {
    throw new Error('Content is missing.');
  }
  if (!options.color) {
    throw new Error('Color is missing.');
  }
  if (!options.position || !options.position.left || !options.position.top) {
    throw new Error('Position is missing.');
  }

  const { boardId, content, color, position } = options;

  return new Promise((resolve, reject) => {
    storage.put(content).
      then(object => {
        boardsApi.collaboration.post().note({
          boardId,
          content: object,
          color,
          type: 'image',
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
      }).
      catch(err => reject(err));
  });
});

export default noteText;
