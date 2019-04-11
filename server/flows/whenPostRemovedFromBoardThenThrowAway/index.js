'use strict';

const reactions = {
  'collaboration.board.postRemoved' (event, { app }) {
    app.collaboration.post(event.data.postId).throwAway({
      postId: event.aggregate.id
    });
  }
};

module.exports = { reactions };
