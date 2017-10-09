import { action } from 'mobx';
import state from '../../state';

const startEditing = action(({ id, content }) => {
  if (!id) {
    throw new Error('Id is missing.');
  }
  if (!content) {
    throw new Error('Content is missing.');
  }

  state.activePostId = id;
  state.activePostContent = content;
});

export default startEditing;
