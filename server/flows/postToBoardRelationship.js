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
  },

  'collaboration.board.pinnedPost': (event, services, mark) => {
    if (event.data.isPrivate) {
      return mark.asDone();
    }

    const app = services.get('app');

    app.collaboration.post(event.data.postId).authorize({
      commands: {
        recolor: { forAuthenticated: true },
        edit: { forAuthenticated: true },
        markAsDone: { forAuthenticated: true },
        move: { forAuthenticated: true },
        throwAway: { forAuthenticated: true }
      },
      events: {
        recolored: { forAuthenticated: true },
        edited: { forAuthenticated: true },
        markedAsDone: { forAuthenticated: true },
        moved: { forAuthenticated: true },
        thrownAway: { forAuthenticated: true }
      }
    });

    mark.asDone();
  }
};

module.exports = { when };
