import state from './state';

const togglePrivacy = function () {
  state.isPrivate = !state.isPrivate;
};

export default togglePrivacy;
