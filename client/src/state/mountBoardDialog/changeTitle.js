import state from './state';

const changeTitle = function (title) {
  if (title === undefined) {
    throw new Error('Title is missing.');
  }

  if (state.title === title) {
    return;
  }

  state.title = title;
};

export default changeTitle;
