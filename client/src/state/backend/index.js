import board from './collaboration/board';
import boards from './lists/boards';
import connect from './connect';
import disconnect from './disconnect';
import post from './collaboration/post';
import posts from './lists/posts';
import reconnect from './reconnect';
import state from './state';

export default {
  state,

  connect,
  disconnect,
  reconnect,

  collaboration: {
    board,
    post
  },

  lists: {
    boards,
    posts
  }
};
