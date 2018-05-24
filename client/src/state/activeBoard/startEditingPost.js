import { set } from 'mobx';
import state from './state';

const pause = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const startEditingPost = async function (postId) {
  if (!postId) {
    throw new Error('Post id is missing.');
  }

  let editedPost;

  for (let i = 0; i < 30; i++) {
    editedPost = state.posts.find(post => post.id === postId);

    if (editedPost) {
      break;
    }

    await pause(100);
  }

  if (!editedPost) {
    return;
  }

  set(state, {
    activePost: {
      id: editedPost.id,
      content: editedPost.content
    }
  });
};

export default startEditingPost;
