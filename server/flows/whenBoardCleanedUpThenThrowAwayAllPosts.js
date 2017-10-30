'use strict';

const when = {
  'collaboration.board.cleanedUp': (event, services, mark) => {
    const app = services.get('app');

    event.data.postIds.forEach(postId => {
      app.collaboration.post(postId).throwAway();
    });

    mark.asDone();
  }
};

module.exports = { when };
