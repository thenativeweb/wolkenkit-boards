import state from '../../state';

const stopEditing = function () {
  state.activePostId = undefined;
};

export default stopEditing;
