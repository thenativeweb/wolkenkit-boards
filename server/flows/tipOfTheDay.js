'use strict';

const identity = {
  'collaboration.board.mounted': event => event.aggregate.id,
  'collaboration.board.pinnedPost': event => event.aggregate.id
};

const initialState = {
  is: 'pristine',
  postCount: 0
};

const transitions = {
  pristine: {
    'collaboration.board.mounted' (flow) {
      flow.transitionTo('counting');
    }
  },

  counting: {
    'collaboration.board.pinnedPost' (flow) {
      flow.setState({
        postCount: flow.state.postCount + 1
      });
    }
  }
};

const reactions = {
  pristine: {
    counting (flow, event, { app }) {
      app.collaboration.post().note({
        boardId: event.aggregate.id,
        content: 'Just double-click on a board to pin a post.',
        position: {
          left: 100,
          top: 100
        },
        type: 'text',
        color: 'green'
      });
    }
  },

  counting: {
    counting (flow, event, { app }) {
      const messages = {
        5: 'Did you know that you can also drop images to the board? Simply drag and drop them from your desktop.'
      };

      const message = messages[flow.state.postCount];

      if (!message) {
        return;
      }

      app.collaboration.post().note({
        boardId: event.aggregate.id,
        content: message,
        position: {
          left: 120,
          top: 120
        },
        type: 'text',
        color: 'green'
      });
    }
  }
};

module.exports = { identity, initialState, transitions, reactions };
