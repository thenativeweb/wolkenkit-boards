import services from '../../services';

const move = function (options) {
  const { boardsApi } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }
  if (!options.position || !options.position.left || !options.position.top) {
    throw new Error('Position is missing.');
  }

  const { postId, position } = options;

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.post(postId).move({
      position
    }).
      await('moved', () => resolve()).
      failed(err => reject(err));
  });
};

export default move;
