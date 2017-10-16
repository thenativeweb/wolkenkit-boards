import { action } from 'mobx';
import state from '../../state';

const changeTitle = action(newTitle => {
  if (newTitle === undefined) {
    throw new Error('Title is missing.');
  }

  state.newTitle = newTitle;
});

export default changeTitle;
