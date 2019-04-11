'use strict';

const { extendReject } = require('wolkenkit-application-tools');

const reject = extendReject({
  isDone (post, command) {
    if (post.state.isDone) {
      return command.reject('Post has already been marked as done.');
    }
  },

  isThrownAway (post, command) {
    if (post.state.isThrownAway) {
      return command.reject('Post has already been thrown away.');
    }
  },

  doesNotRecolor (post, command) {
    if (post.state.color === command.data.newColor) {
      return command.reject(`Post is already colored in '${post.state.color}'.`);
    }
  }
});

module.exports = reject;
