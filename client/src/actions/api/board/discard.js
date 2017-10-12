import services from '../../../services';

const discard = function ({ boardId }) {
  if (!boardId) {
    throw new Error('Board id is missing.');
  }

  const { boardsApi } = services;

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.board(boardId).discard().
      await('discarded', () => resolve()).
      failed(error => reject(error));
  });
};

export default discard;
