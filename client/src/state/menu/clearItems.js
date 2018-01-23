import { extendObservable } from 'mobx';
import state from './state';

const clearItems = function () {
  if (state.items.length === 0) {
    return;
  }

  extendObservable(state, {
    items: []
  });
};

export default clearItems;
