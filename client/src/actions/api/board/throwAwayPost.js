import services from '../../../services';

// import storage from '../storage';

const throwAwayPost = function (options) {
  const { boardsApi, overlay } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }
  if (!options.boardId) {
    throw new Error('Board id is missing.');
  }

  const { boardId, postId } = options;

  return new Promise(resolve => {
    boardsApi.collaboration.board(boardId).throwAwayPost({
      postId
    }).
      await('thrownAwayPost', () => resolve()).
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

export default throwAwayPost;
