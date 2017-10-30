'use strict';

const onlyIfPostHasNotBeenThrownAway = function () {
  return function (post, command, mark) {
    if (post.state.isThrownAway) {
      return mark.asRejected('Post has already been thrown away.');
    }

    mark.asReadyForNext();
  };
};

module.exports = onlyIfPostHasNotBeenThrownAway;
