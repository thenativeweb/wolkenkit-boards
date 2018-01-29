import state from './state';

const startEditingTitle = function (title) {
  if (!title) {
    throw new Error('Title is missing.');
  }

  state.newTitle = title;
};

export default startEditingTitle;
