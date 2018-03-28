'use strict';

const when = {
  'collaboration.board.removedPost' (event, { app }) {
    app.collaboration.post(event.data.postId).throwAway({
      postId: event.aggregate.id
    });
  }
};

module.exports = { when };
