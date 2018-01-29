import state from './state';

const stopEditingPost = function () {
  if (!state.activePost) {
    return;
  }

  state.activePost = undefined;
};

export default stopEditingPost;
