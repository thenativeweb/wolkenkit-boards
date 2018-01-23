import state from './state';

const expand = function () {
  if (!state.isExpanded) {
    state.isExpanded = true;
  }
};

export default expand;
