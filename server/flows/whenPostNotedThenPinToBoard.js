'use strict';

const when = {
  'collaboration.post.noted' (event, { app }) {
    app.collaboration.board(event.data.boardId).pinPost({
      postId: event.aggregate.id
    });
  }
};

module.exports = { when };
