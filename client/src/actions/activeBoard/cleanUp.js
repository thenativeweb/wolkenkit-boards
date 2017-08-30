import services from '../../services';
import state from '../../state';

const cleanUp = function () {
  const { boardsApi } = services;

  if (!state.activeBoard || !state.activeBoard.id) {
    throw new Error('No board activated yet.');
  }

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.
      board(state.activeBoard.id).
      cleanUp().
      await('cleanedUp', () => resolve()).
      failed(err => reject(err));
  });
};

export default cleanUp;
