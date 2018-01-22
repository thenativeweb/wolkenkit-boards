import state from './state';

const stopEditingTitle = function () {
  if (!state.newTitle) {
    return;
  }

  state.newTitle = undefined;
};

export default stopEditingTitle;
