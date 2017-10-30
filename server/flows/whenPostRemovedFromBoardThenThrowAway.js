'use strict';

const when = {
  'collaboration.board.removedPost': (event, services, mark) => {
    const app = services.get('app');

    app.collaboration.post(event.data.postId).throwAway({
      postId: event.aggregate.id
    });

    mark.asDone();
  }
};

module.exports = { when };
