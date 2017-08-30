import state from '../../state';

const expand = function () {
  if (!state.isMenuExpanded) {
    state.isMenuExpanded = true;
  }
};

export default expand;
