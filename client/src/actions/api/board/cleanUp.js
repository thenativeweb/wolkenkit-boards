import { action } from 'mobx';
import services from '../../../services';

const cleanUp = action(({ boardId }) => {
  if (!boardId) {
    throw new Error('Board id is missing.');
  }

  const { boardsApi, overlay } = services;

  return new Promise(resolve => {
    boardsApi.collaboration.
      board(boardId).
      cleanUp().
      await('cleanedUp', () => resolve()).
      failed(err => {
        overlay.alert({
          text: err.message
        });
      });
  });
});

export default cleanUp;
