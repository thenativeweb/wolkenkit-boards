'use strict';

const when = {
  'collaboration.post.noted': (event, services, mark) => {
    const app = services.get('app');

    app.collaboration.board(event.data.boardId).pinPost({
      postId: event.aggregate.id
    });

    mark.asDone();
  }
};

module.exports = { when };
