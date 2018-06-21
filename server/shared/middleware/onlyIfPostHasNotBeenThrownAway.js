'use strict';

const onlyIfPostHasNotBeenThrownAway = function () {
  return function (post, command) {
    if (post.state.isThrownAway) {
      return command.reject('Post has already been thrown away.');
    }
  };
};

module.exports = onlyIfPostHasNotBeenThrownAway;
