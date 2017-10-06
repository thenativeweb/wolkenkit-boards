import state from '../../state';

const startEditing = function (postId) {
  state.activePostId = postId;
};

export default startEditing;
