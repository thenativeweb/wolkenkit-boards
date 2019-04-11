'use strict';

const { forAuthenticated, forOwner, transferOwnership, withOwnership } = require('wolkenkit-application-tools');

const forAuthenticatedIfSharedAndAlwaysForOwner = require('./forAuthenticatedIfSharedAndAlwaysForOwner'),
      getSlug = require('./getSlug'),
      getUuidRegex = require('../../../shared/getUuidRegex'),
      reject = require('./reject');

const initialState = {
  title: '',
  slug: '',
  postIds: [],
  isShared: false,
  isDiscarded: false
};

const commands = {
  mount: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 }
      },
      required: [ 'title' ]
    },

    isAuthorized: forAuthenticated(),

    handle (board, command) {
      reject(command).if(board).exists();

      transferOwnership(board, { to: command.initiator.id });

      board.events.publish('mounted', {
        title: command.data.title,
        slug: getSlug(command.data.title)
      });
    }
  },

  share: {
    isAuthorized: forOwner(),

    handle (board, command) {
      reject(command).if(board).doesNotExist();
      reject(command).if(board).isShared();
      reject(command).if(board).isDiscarded();

      board.events.publish('shared');
    }
  },

  rename: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 }
      },
      required: [ 'title' ]
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner(),

    handle (board, command) {
      reject(command).if(board).doesNotExist();
      reject(command).if(board).isDiscarded();

      board.events.publish('renamed', {
        title: command.data.title,
        slug: getSlug(command.data.title)
      });
    }
  },

  pinPost: {
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'string', pattern: getUuidRegex() }
      },
      required: [ 'postId' ]
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner(),

    handle (board, command) {
      reject(command).if(board).doesNotExist();
      reject(command).if(board).isDiscarded();
      reject(command).if(board).hasPostPinned();

      board.events.publish('postPinned', {
        postId: command.data.postId,
        isShared: board.state.isShared
      });
    }
  },

  removePost: {
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'string', pattern: getUuidRegex() }
      },
      required: [ 'postId' ]
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner(),

    handle (board, command) {
      reject(command).if(board).doesNotExist();
      reject(command).if(board).isDiscarded();
      reject(command).if(board).doesNotHavePostPinned();

      board.events.publish('postRemoved', {
        postId: command.data.postId
      });
    }
  },

  cleanUp: {
    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner(),

    handle (board, command) {
      reject(command).if(board).doesNotExist();
      reject(command).if(board).isDiscarded();
      reject(command).if(board).doesNotHavePostsPinned();

      board.events.publish('cleanedUp', {
        postIds: board.state.postIds
      });
    }
  },

  discard: {
    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner(),

    handle (board, command) {
      reject(command).if(board).doesNotExist();
      reject(command).if(board).isDiscarded();

      board.events.publish('discarded', {
        postIds: board.state.postIds
      });
    }
  }
};

const events = {
  mounted: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 },
        slug: { type: 'string', minLength: 1 }
      },
      required: [ 'title', 'slug' ],
      additionalProperties: false
    },

    handle (board, event) {
      board.setState({
        title: event.data.title,
        slug: event.data.slug
      });
    },

    isAuthorized: forOwner()
  },

  shared: {
    schema: {
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: false
    },

    handle (board) {
      board.setState({
        isShared: true
      });
    },

    isAuthorized: forAuthenticated()
  },

  renamed: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 },
        slug: { type: 'string', minLength: 1 }
      },
      required: [ 'title', 'slug' ],
      additionalProperties: false
    },

    handle (board, event) {
      board.setState({
        title: event.data.title,
        slug: event.data.slug
      });
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner()
  },

  postPinned: {
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'string', pattern: getUuidRegex() }
      },
      required: [ 'postId' ],
      additionalProperties: false
    },

    handle (board, event) {
      board.setState({
        postIds: [ ...board.state.postIds, event.data.postId ]
      });
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner()
  },

  postRemoved: {
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'string', pattern: getUuidRegex() }
      },
      required: [ 'postId' ],
      additionalProperties: false
    },

    handle (board, event) {
      board.setState({
        postIds: board.state.postIds.filter(id => id !== event.data.postId)
      });
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner()
  },

  cleanedUp: {
    schema: {
      type: 'object',
      properties: {
        postIds: {
          type: 'array',
          item: { type: 'string', pattern: getUuidRegex() }
        }
      },
      required: [ 'postIds' ],
      additionalProperties: false
    },

    handle (board) {
      board.setState({
        postIds: []
      });
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner()
  },

  discarded: {
    schema: {
      type: 'object',
      properties: {
        postIds: {
          type: 'array',
          item: { type: 'string', pattern: getUuidRegex() }
        }
      },
      required: [ 'postIds' ],
      additionalProperties: false
    },

    handle (board) {
      board.setState({
        isDiscarded: true
      });
    },

    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner()
  }
};

module.exports = withOwnership({ initialState, commands, events });
