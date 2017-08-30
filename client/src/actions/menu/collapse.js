import state from '../../state';

const collapse = function () {
  if (state.isMenuExpanded) {
    state.isMenuExpanded = false;
  }
};

export default collapse;
