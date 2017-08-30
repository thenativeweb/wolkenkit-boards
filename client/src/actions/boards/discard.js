import services from '../../services';

const discard = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.boardId) {
    throw new Error('Board id is missing.');
  }

  const { boardId } = options;
  const { boardsApi } = services;

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.board(boardId).discard().
      await('discarded', () => {
        resolve();
      }).
      failed(error => reject(error));
  });
};

export default discard;
