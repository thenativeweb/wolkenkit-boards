import state from './state';

const stopEditinPost = function () {
  if (!state.activePost) {
    return;
  }

  state.activePost = undefined;
};

export default stopEditinPost;
