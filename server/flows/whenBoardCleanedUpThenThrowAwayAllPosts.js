'use strict';

const reactions = {
  'collaboration.board.cleanedUp' (event, { app }) {
    event.data.postIds.forEach(postId => {
      app.collaboration.post(postId).throwAway();
    });
  }
};

module.exports = { reactions };
