import services from '../../../services';

// import storage from '../storage';

const removePost = function (options) {
  const { boardsApi, overlay } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }

  const { postId } = options;

  return new Promise(resolve => {
    boardsApi.collaboration.post(postId).throwAway().
      await('thrownAway', () => resolve()).
      failed(err => {
        overlay.alert({
          text: err.message
        });
      });

    // Once this operation is supported by wolkenkit-depot-file this can be enabled.
    // if (type === 'image') {
    //   storage.delete(id).
    //     catch(err => reject(err));
    // }
  });
};

export default removePost;
