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
          required: [ 'left', 'top' ],
          additionalProperties: false
        }
      },
      required: [ 'boardId', 'content', 'type', 'color', 'position' ],
      additionalProperties: false
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
      required: [ 'to' ],
      additionalProperties: false
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
      required: [ 'content' ],
      additionalProperties: false
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
          required: [ 'left', 'top' ],
          additionalProperties: false
        }
      },
      required: [ 'position' ],
      additionalProperties: false
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
          required: [ 'left', 'top' ],
          additionalProperties: false
        },
        creator: { type: 'string', minLength: 1 }
      },
      required: [ 'boardId', 'content', 'type', 'color', 'position', 'creator' ],
      additionalProperties: false
    },

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
    schema: {
      type: 'object',
      properties: {
        from: { type: 'string', minLength: 1 },
        to: { type: 'string', minLength: 1 }
      },
      required: [ 'from', 'to' ],
      additionalProperties: false
    },

    handle (post, event) {
      post.setState({
        color: event.data.to
      });
    },

    isAuthorized: forBoard()
  },

  edited: {
    schema: {
      type: 'object',
      properties: {
        content: { type: [ 'string', 'object' ]}
      },
      required: [ 'content' ],
      additionalProperties: false
    },

    handle (post, event) {
      post.setState({
        content: event.data.content
      });
    },

    isAuthorized: forBoard()
  },

  moved: {
    schema: {
      type: 'object',
      properties: {
        position: {
          type: 'object',
          properties: {
            left: { type: 'number' },
            top: { type: 'number' }
          },
          required: [ 'left', 'top' ],
          additionalProperties: false
        }
      },
      required: [ 'position' ],
      additionalProperties: false
    },

    handle (post, event) {
      post.setState({
        position: event.data.position
      });
    },

    isAuthorized: forBoard()
  },

  markedAsDone: {
    schema: {
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: false
    },

    handle (post) {
      post.setState({
        isDone: true
      });
    },

    isAuthorized: forBoard()
  },

  thrownAway: {
    schema: {
      type: 'object',
      properties: {
        boardId: { type: 'string', pattern: getUuidRegex() }
      },
      required: [ 'boardId' ],
      additionalProperties: false
    },

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
