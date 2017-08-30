import services from '../../services';
import state from '../../state';

// import storage from '../storage';

const throwAwayPost = function (options) {
  const { boardsApi } = services;

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

  if (!state.activeBoard || !state.activeBoard.id) {
    throw new Error('No board activated yet.');
  }

  return new Promise((resolve, reject) => {
    boardsApi.collaboration.board(boardId).throwAwayPost({
      postId
    }).
      await('thrownAwayPost', () => resolve()).
      failed(err => reject(err));

    // Once this operation is supported by wolkenkit-depot-file this can be enabled.
    // if (type === 'image') {
    //   storage.delete(id).
    //     catch(err => reject(err));
    // }
  });
};

export default throwAwayPost;
