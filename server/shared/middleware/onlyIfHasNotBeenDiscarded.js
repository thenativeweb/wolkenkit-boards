'use strict';

const onlyIfHasNotBeenDiscarded = function () {
  return function (board, command, mark) {
    if (board.state.hasBeenDiscarded) {
      return mark.asRejected('Board has already been discarded.');
    }

    mark.asReadyForNext();
  };
};

module.exports = onlyIfHasNotBeenDiscarded;
