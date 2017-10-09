import { action } from 'mobx';
import state from '../../state';

const adjustTitle = action(newTitle => {
  if (newTitle === undefined) {
    throw new Error('New title is missing.');
  }

  state.newBoardTitle = newTitle;
});

export default adjustTitle;
