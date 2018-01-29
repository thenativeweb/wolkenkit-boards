import state from './state';

const show = function () {
  if (state.isVisible === true) {
    return;
  }

  state.isVisible = true;
};

export default show;
