import services from '../../services';

const edit = function (options) {
  const { boardsApi } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }
  if (!options.content) {
    throw new Error('Content is missing.');
  }

  const { postId, content } = options;

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.post(postId).edit({
      content
    }).
      await('edited', () => resolve()).
      failed(err => reject(err));
  });
};

export default edit;
