'use strict';

const reactions = {
  'collaboration.board.cleanedUp' (event, { app }) {
    for (const postId of event.data.postIds) {
      app.collaboration.post(postId).throwAway();
    }
  }
};

module.exports = { reactions };
