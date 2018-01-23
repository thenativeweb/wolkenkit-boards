import state from './state';

const collapse = function () {
  if (state.isExpanded) {
    state.isExpanded = false;
  }
};

export default collapse;
