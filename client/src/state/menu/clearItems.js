import { set } from 'mobx';
import state from './state';

const clearItems = function () {
  if (state.items.length === 0) {
    return;
  }

  set(state, {
    items: []
  });
};

export default clearItems;
