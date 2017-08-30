import services from '../../services';
import state from '../../state';

const mount = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.title) {
    throw new Error('Title is missing.');
  }

  const { title, isPrivate } = options;
  const { boardsApi } = services;

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.board().mount({
      title
    }).
      await('mounted', mountedEvent => {
        state.newBoardTitle = '';

        if (!isPrivate) {
          boardsApi.collaboration.board(mountedEvent.aggregate.id).share({
            with: 'authenticated'
          }).
            await('shared', () => {
              resolve();
            });
        } else {
          resolve();
        }
      }).
      failed(error => reject(error));
  });
};

export default mount;
