'use strict';

const { extendReject } = require('wolkenkit-application-tools');

const reject = extendReject({
  isShared (board, command) {
    if (board.state.isShared) {
      return command.reject('Board has already been shared.');
    }
  },

  isDiscarded (board, command) {
    if (board.state.isDiscarded) {
      return command.reject('Board has already been discarded.');
    }
  },

  hasPostPinned (board, command) {
    if (board.state.postIds.includes(command.data.postId)) {
      return command.reject('Board already has post pinned.');
    }
  },

  doesNotHavePostPinned (board, command) {
    if (!board.state.postIds.includes(command.data.postId)) {
      return command.reject('Board does not have post pinned.');
    }
  },

  doesNotHavePostsPinned (board, command) {
    if (board.state.postIds.length === 0) {
      return command.reject('Board does not have posts pinned.');
    }
  }
});

module.exports = reject;
