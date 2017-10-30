import services from '../../../services';

const rename = function ({ boardId, title }) {
  const { boardsApi } = services;

  if (!boardId) {
    throw new Error('Board id is missing.');
  }

  if (!title) {
    throw new Error('New title is missing.');
  }

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.board(boardId).rename({
      title
    }).
      await('renamed', event => resolve(event)).
      failed(error => reject(error));
  });
};

export default rename;
