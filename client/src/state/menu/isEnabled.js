import state from './state';

const isEnabled = function () {
  return state.items.length !== 0;
};

export default isEnabled;
