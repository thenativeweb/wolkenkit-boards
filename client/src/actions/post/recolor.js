import services from '../../services';

const recolor = function (options) {
  const { boardsApi } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }
  if (!options.to) {
    throw new Error('New color is missing.');
  }

  const { postId, to } = options;

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.post(postId).recolor({
      to
    }).
      await('recolored', () => resolve()).
      failed(err => reject(err));
  });
};

export default recolor;
