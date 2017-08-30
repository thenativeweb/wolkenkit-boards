import services from '../../services';

const markAsDone = function (options) {
  const { boardsApi } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }

  const { postId } = options;

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.post(postId).markAsDone().
      await('markedAsDone', () => resolve()).
      failed(err => reject(err));
  });
};

export default markAsDone;
