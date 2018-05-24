import { set } from 'mobx';
import state from './state';

const registerItems = function (items) {
  if (!items) {
    throw new Error('Items are missing.');
  }

  items.forEach(item => {
    if (!item.id || !item.label || !item.onSelect) {
      throw new Error('Invalid menu item.');
    }
  });

  set(state, {
    items
  });
};

export default registerItems;
