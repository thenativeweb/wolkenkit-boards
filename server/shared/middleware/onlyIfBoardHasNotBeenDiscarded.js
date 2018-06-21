'use strict';

const onlyIfBoardHasNotBeenDiscarded = function () {
  return function (board, command) {
    if (board.state.isDiscarded) {
      return command.reject('Board has already been discarded.');
    }
  };
};

module.exports = onlyIfBoardHasNotBeenDiscarded;
