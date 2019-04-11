'use strict';

const forAuthenticatedIfSharedAndAlwaysForOwner = require('../board/forAuthenticatedIfSharedAndAlwaysForOwner');

const forBoard = function () {
  return async function (post, command, services) {
    const isAuthorizedForBoard = forAuthenticatedIfSharedAndAlwaysForOwner();
    const board = await services.app.collaboration.board(command.data.boardId).read();

    return isAuthorizedForBoard(board, command, services);
  };
};

module.exports = forBoard;
