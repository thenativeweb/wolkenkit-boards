import state from '../../state';
import { action, extendObservable } from 'mobx';

const startEditing = action(({ postId, content }) => {
  if (!postId) {
    throw new Error('Post id is missing.');
  }
  if (!content) {
    throw new Error('Content is missing.');
  }

  extendObservable(state, {
    activePost: {
      id: postId,
      content
    }
  });
});

export default startEditing;
