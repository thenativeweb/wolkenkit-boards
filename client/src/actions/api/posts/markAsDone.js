import services from '../../../services';

const markAsDone = function (options) {
  const { boardsApi, overlay } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }

  const { postId } = options;

  return new Promise(resolve => {
    boardsApi.collaboration.post(postId).markAsDone().
      await('markedAsDone', () => resolve()).
      failed(err => {
        overlay.alert({
          text: err.message
        });
      });
  });
};

export default markAsDone;
