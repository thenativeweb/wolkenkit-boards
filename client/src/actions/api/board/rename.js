import services from '../../../services';
import state from '../../../state';

const rename = function (newTitle) {
  const { boardsApi } = services;

  if (!newTitle) {
    throw new Error('New title is missing.');
  }

  if (!state.activeBoard || !state.activeBoard.id) {
    throw new Error('No board activated yet.');
  }

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.board(state.activeBoard.id).rename({
      title: newTitle
    }).
      await('renamed', event => resolve(event)).
      failed(error => reject(error));
  });
};

export default rename;
