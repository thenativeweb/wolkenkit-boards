'use strict';

const onlyIfBoardHasNotBeenDiscarded = function () {
  return function (board, command, mark) {
    if (board.state.isDiscarded) {
      return mark.asRejected('Board has already been discarded.');
    }

    mark.asReadyForNext();
  };
};

module.exports = onlyIfBoardHasNotBeenDiscarded;
