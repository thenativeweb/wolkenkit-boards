import { extendObservable } from 'mobx';
import state from './state';

const hide = function () {
  if (state.isVisible === false) {
    return;
  }

  extendObservable(state, {
    isVisible: false,
    title: '',
    isPrivate: false
  });
};

export default hide;
