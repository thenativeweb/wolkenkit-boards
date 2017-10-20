'use strict';

const only = require('wolkenkit-command-tools').only;

const initialState = {
  boardId: undefined,
  content: undefined,
  type: undefined,
  isDone: false,
  isThrownAway: false,
  position: { top: '10', left: '10' },
  creator: undefined,
  color: 'yellow',
  isAuthorized: {
    commands: {},
    events: {}
  }
};

const commands = {
  note: [
    only.ifNotExists(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        boardId: { type: 'string', format: 'uuid' },
        content: { type: [ 'string', 'object' ]},
        position: {
          type: 'object',
          properties: {
            left: { type: 'number' },
            top: { type: 'number' }
          },
          required: [ 'left', 'top' ]
        },
        type: { type: 'string', enum: [ 'text', 'image' ]},
        color: { type: 'string', minLength: 1 }
      },
      required: [ 'boardId', 'content', 'position', 'type', 'color' ]
    }),
    (post, command, services, mark) => {
      post.events.publish('noted', {
        boardId: command.data.boardId,
        content: command.data.content,
        type: command.data.type,
        position: command.data.position,
        color: command.data.color,
        isDone: false,
        creator: command.user.token.nickname || 'wolkenkit bot'
      });

      mark.asDone();
    }
  ],

  recolor: [
    only.ifExists(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        to: { type: 'string', minLength: 1 }
      },
      required: [ 'to' ]
    }),
    (post, command, mark) => {
      if (post.state.color === command.data.newColor) {
        return mark.asRejected(`This post is already colored in ${post.state.color}.`);
      }

      post.events.publish('recolored', {
        from: post.state.color,
        to: command.data.to
      });

      mark.asDone();
    }
  ],

  edit: [
    only.ifExists(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        content: { type: [ 'string', 'object' ]}
      },
      required: [ 'content' ]
    }),
    (post, command, mark) => {
      post.events.publish('edited', {
        content: command.data.content
      });

      mark.asDone();
    }
  ],

  move: [
    only.ifExists(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        position: {
          type: 'object',
          properties: {
            left: { type: 'number' },
            top: { type: 'number' }
          },
          required: [ 'left', 'top' ]
        }
      },
      required: [ 'position' ]
    }),
    (post, command, mark) => {
      post.events.publish('moved', {
        position: command.data.position
      });

      mark.asDone();
    }
  ],

  markAsDone: [
    only.ifExists(),
    (post, command, mark) => {
      if (post.state.isDone) {
        return mark.asRejected('Post has already been marked as done.');
      }

      post.events.publish('markedAsDone');
      mark.asDone();
    }
  ],

  throwAway: [
    only.ifExists(),
    (post, command, mark) => {
      post.events.publish('thrownAway', {
        boardId: post.state.boardId
      });

      mark.asDone();
    }
  ]
};

const events = {
  noted (post, event) {
    post.setState({
      boardId: event.data.boardId,
      content: event.data.content,
      type: event.data.type,
      position: event.data.position,
      color: event.data.color,
      isDone: event.data.isDone,
      creator: event.data.creator
    });
  },

  recolored (post, event) {
    post.setState({
      color: event.data.to
    });
  },

  edited (post, event) {
    post.setState({
      content: event.data.content
    });
  },

  moved (post, event) {
    post.setState({
      position: event.data.position
    });
  },

  markedAsDone (post) {
    post.setState({
      isDone: true
    });
  },

  thrownAway (post) {
    post.setState({
      isThrownAway: true
    });
  }
};

module.exports = { initialState, commands, events };
