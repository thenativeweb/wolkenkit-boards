'use strict';

const when = {
  'collaboration.post.noted': (event, services, mark) => {
    const app = services.get('app');

    app.collaboration.board(event.data.boardId).pinPost({
      postId: event.aggregate.id
    });

    mark.asDone();
  },

  'collaboration.post.thrownAway': (event, services, mark) => {
    const app = services.get('app');

    app.collaboration.board(event.data.boardId).removePost({
      postId: event.aggregate.id
    });

    mark.asDone();
  },

  'collaboration.board.cleanedUp': (event, services, mark) => {
    const app = services.get('app');

    event.data.postIds.forEach(postId => {
      app.collaboration.post(postId).throwAway();
    });

    mark.asDone();
  }
};

module.exports = { when };
