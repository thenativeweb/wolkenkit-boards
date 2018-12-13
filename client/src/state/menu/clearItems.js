import { set } from 'mobx';

export default function (state) {
  const clearItems = function () {
    if (state.items.length === 0) {
      return;
    }

    set(state, {
      items: []
    });
  };

  return clearItems;
}
