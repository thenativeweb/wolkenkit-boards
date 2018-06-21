'use strict';

const { only } = require('wolkenkit-command-tools');

const onlyIfPostHasNotBeenThrownAway = require('../../shared/middleware/onlyIfPostHasNotBeenThrownAway');

const initialState = {
  boardId: undefined,
  content: undefined,
  type: undefined,
  position: { top: '10', left: '10' },
  creator: undefined,
  color: 'yellow',
  isDone: false,
  isThrownAway: false,
  isAuthorized: {
    commands: {},
    events: {}
  }
};

const commands = {
  note: [
    only.ifNotExists(),
    only.ifCommandValidatedBy({
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
    (post, command) => {
      post.events.publish('noted', {
        boardId: command.data.boardId,
        content: command.data.content,
        type: command.data.type,
        position: command.data.position,
        color: command.data.color,
        isDone: false,
        creator: command.user.token.nickname || 'wolkenkit bot'
      });
    }
  ],

  recolor: [
    only.ifExists(),
    onlyIfPostHasNotBeenThrownAway(),
    only.ifCommandValidatedBy({
      type: 'object',
      properties: {
        to: { type: 'string', minLength: 1 }
      },
      required: [ 'to' ]
    }),
    (post, command) => {
      if (post.state.color === command.data.newColor) {
        return command.reject(`This post is already colored in ${post.state.color}.`);
      }

      post.events.publish('recolored', {
        from: post.state.color,
        to: command.data.to
      });
    }
  ],

  edit: [
    only.ifExists(),
    onlyIfPostHasNotBeenThrownAway(),
    only.ifCommandValidatedBy({
      type: 'object',
      properties: {
        content: { type: [ 'string', 'object' ]}
      },
      required: [ 'content' ]
    }),
    (post, command) => {
      post.events.publish('edited', {
        content: command.data.content
      });
    }
  ],

  move: [
    only.ifExists(),
    onlyIfPostHasNotBeenThrownAway(),
    only.ifCommandValidatedBy({
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
    (post, command) => {
      post.events.publish('moved', {
        position: command.data.position
      });
    }
  ],

  markAsDone: [
    only.ifExists(),
    onlyIfPostHasNotBeenThrownAway(),
    (post, command) => {
      if (post.state.isDone) {
        return command.reject('Post has already been marked as done.');
      }

      post.events.publish('markedAsDone');
    }
  ],

  throwAway: [
    only.ifExists(),
    onlyIfPostHasNotBeenThrownAway(),
    post => {
      post.events.publish('thrownAway', {
        boardId: post.state.boardId
      });
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
      boardId: undefined,
      isThrownAway: true
    });
  }
};

module.exports = { initialState, commands, events };
