'use strict';

const forAuthenticatedIfSharedAndAlwaysForOwner = function () {
  return function (board, command, { client }) {
    if (board.state.isShared) {
      return client.user.id !== 'anonymous';
    }

    return board.state.owner === client.user.id;
  };
};

module.exports = forAuthenticatedIfSharedAndAlwaysForOwner;
