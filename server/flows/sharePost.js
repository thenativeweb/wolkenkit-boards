'use strict';

const when = {
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
