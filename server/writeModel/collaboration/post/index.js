'use strict';

const forBoard = require('./forBoard'),
      getUuidRegex = require('../../../shared/getUuidRegex'),
      reject = require('./reject');

const initialState = {
  boardId: undefined,
  content: '',
  type: 'text',
  color: 'yellow',
  position: { top: 10, left: 10 },
  creator: undefined,
  isDone: false,
  isThrownAway: false
};

const commands = {
  note: {
    schema: {
      type: 'object',
      properties: {
        boardId: { type: 'string', pattern: getUuidRegex() },
        content: { type: [ 'string', 'object' ]},
        type: { type: 'string', enum: [ 'text', 'image' ]},
        color: { type: 'string', minLength: 1 },
        position: {
          type: 'object',
          properties: {
            left: { type: 'number' },
            top: { type: 'number' }
          },
          required: [ 'left', 'top' ]
        }
      },
      required: [ 'boardId', 'content', 'type', 'color', 'position' ]
    },

    isAuthorized: forBoard(),

    handle (post, command) {
      reject(command).if(post).exists();

      post.events.publish('noted', {
        boardId: command.data.boardId,
        content: command.data.content,
        type: command.data.type,
        color: command.data.color,
        position: command.data.position,
        creator: command.initiator.token.nickname || 'wolkenkit bot'
      });
    }
  },

  recolor: {
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', minLength: 1 }
      },
      required: [ 'to' ]
    },

    isAuthorized: forBoard(),

    handle (post, command) {
      reject(command).if(post).doesNotExist();
      reject(command).if(post).isDone();
      reject(command).if(post).isThrownAway();
      reject(command).if(post).doesNotRecolor();

      post.events.publish('recolored', {
        from: post.state.color,
        to: command.data.to
      });
    }
  },

  edit: {
    schema: {
      type: 'object',
      properties: {
        content: { type: [ 'string', 'object' ]}
      },
      required: [ 'content' ]
    },

    isAuthorized: forBoard(),

    handle (post, command) {
      reject(command).if(post).doesNotExist();
      reject(command).if(post).isDone();
      reject(command).if(post).isThrownAway();

      post.events.publish('edited', {
        content: command.data.content
      });
    }
  },

  move: {
    schema: {
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
    },

    isAuthorized: forBoard(),

    handle (post, command) {
      reject(command).if(post).doesNotExist();
      reject(command).if(post).isThrownAway();

      post.events.publish('moved', {
        position: command.data.position
      });
    }
  },

  markAsDone: {
    isAuthorized: forBoard(),

    handle (post, command) {
      reject(command).if(post).doesNotExist();
      reject(command).if(post).isDone();
      reject(command).if(post).isThrownAway();

      post.events.publish('markedAsDone');
    }
  },

  throwAway: {
    isAuthorized: forBoard(),

    handle (post, command) {
      reject(command).if(post).doesNotExist();
      reject(command).if(post).isThrownAway();

      post.events.publish('thrownAway', {
        boardId: post.state.boardId
      });
    }
  }
};

const events = {
  noted: {
    handle (post, event) {
      post.setState({
        boardId: event.data.boardId,
        content: event.data.content,
        type: event.data.type,
        color: event.data.color,
        position: event.data.position,
        creator: event.data.creator
      });
    },

    isAuthorized: forBoard()
  },

  recolored: {
    handle (post, event) {
      post.setState({
        color: event.data.to
      });
    },

    isAuthorized: forBoard()
  },

  edited: {
    handle (post, event) {
      post.setState({
        content: event.data.content
      });
    },

    isAuthorized: forBoard()
  },

  moved: {
    handle (post, event) {
      post.setState({
        position: event.data.position
      });
    },

    isAuthorized: forBoard()
  },

  markedAsDone: {
    handle (post) {
      post.setState({
        isDone: true
      });
    },

    isAuthorized: forBoard()
  },

  thrownAway: {
    handle (post) {
      post.setState({
        boardId: undefined,
        isThrownAway: true
      });
    },

    isAuthorized: forBoard()
  }
};

module.exports = { initialState, commands, events };
