import state from './state';

const changeTitle = function (title) {
  if (title === undefined) {
    throw new Error('Title is missing.');
  }

  state.newTitle = title;
};

export default changeTitle;
