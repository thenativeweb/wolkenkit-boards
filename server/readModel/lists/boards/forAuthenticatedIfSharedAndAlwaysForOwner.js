'use strict';

const forAuthenticatedIfSharedAndAlwaysForOwner = function () {
  return function (board, command, { client }) {
    if (board.isShared) {
      return client.user.id !== 'anonymous';
    }

    return board.owner === client.user.id;
  };
};

module.exports = forAuthenticatedIfSharedAndAlwaysForOwner;
