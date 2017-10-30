import services from '../../../services';

// import storage from '../storage';

const removePost = function ({ boardId, postId }) {
  const { boardsApi, overlay } = services;

  if (!boardId) {
    throw new Error('Board id is missing.');
  }
  if (!postId) {
    throw new Error('Post id is missing.');
  }

  return new Promise(resolve => {
    boardsApi.collaboration.board(boardId).removePost({ postId }).
      await('removedPost', () => resolve()).
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
