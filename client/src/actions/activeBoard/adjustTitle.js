import state from '../../state';

const adjustTitle = function (newTitle) {
  if (newTitle === undefined) {
    throw new Error('New title is missing.');
  }

  state.newBoardTitle = newTitle;
};

export default adjustTitle;
