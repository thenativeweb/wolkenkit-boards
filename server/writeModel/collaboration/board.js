'use strict';

const only = require('wolkenkit-command-tools').only,
      slugify = require('slugify');

const onlyIfBoardHasNotBeenDiscarded = require('../../shared/middleware/onlyIfBoardHasNotBeenDiscarded');

const initialState = {
  title: undefined,
  slug: undefined,
  postIds: [],
  isPrivate: true,
  isDiscarded: false,
  isAuthorized: {
    commands: {
      mount: { forAuthenticated: true }
    },
    events: {
      shared: { forAuthenticated: true },
      cleanedUp: { forAuthenticated: true }
    }
  }
};

const commands = {
  mount: [
    only.ifNotExists(),
    onlyIfBoardHasNotBeenDiscarded(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 }
      },
      required: [ 'title' ]
    }),
    (board, command, mark) => {
      board.events.publish('mounted', {
        title: command.data.title,
        slug: slugify(command.data.title, { lower: true })
      });
      mark.asDone();
    }
  ],

  share: [
    only.ifExists(),
    onlyIfBoardHasNotBeenDiscarded(),
    (board, command, mark) => {
      board.authorize({
        commands: {
          rename: { forAuthenticated: true },
          pinPost: { forAuthenticated: true },
          removePost: { forAuthenticated: true }
        },
        events: {
          renamed: { forAuthenticated: true },
          pinnedPost: { forAuthenticated: true },
          removedPost: { forAuthenticated: true }
        }
      });

      board.events.publish('shared');

      mark.asDone();
    }
  ],

  rename: [
    only.ifExists(),
    onlyIfBoardHasNotBeenDiscarded(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 }
      },
      required: [ 'title' ]
    }),
    (board, command, mark) => {
      board.events.publish('renamed', {
        title: command.data.title,
        slug: slugify(command.data.title)
      });

      mark.asDone();
    }
  ],

  pinPost: [
    only.ifExists(),
    onlyIfBoardHasNotBeenDiscarded(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        postId: { type: 'string', format: 'uuid' }
      },
      required: [ 'postId' ]
    }),
    (board, command, mark) => {
      if (board.state.postIds.includes(command.data.postId)) {
        return mark.asRejected('Post has already been pinned.');
      }

      board.events.publish('pinnedPost', {
        postId: command.data.postId,
        isPrivate: board.state.isPrivate
      });

      mark.asDone();
    }
  ],

  removePost: [
    only.ifExists(),
    onlyIfBoardHasNotBeenDiscarded(),
    only.ifValidatedBy({
      type: 'object',
      properties: {
        postId: { type: 'string', format: 'uuid' }
      },
      required: [ 'postId' ]
    }),
    (board, command, mark) => {
      if (!board.state.postIds.includes(command.data.postId)) {
        return mark.asRejected('Post has not been pinned to this board.');
      }

      board.events.publish('removedPost', {
        postId: command.data.postId
      });

      mark.asDone();
    }
  ],

  cleanUp: [
    only.ifExists(),
    onlyIfBoardHasNotBeenDiscarded(),
    (board, command, mark) => {
      if (board.state.postIds.length === 0) {
        return mark.asRejected('Board is already empty.');
      }

      board.events.publish('cleanedUp', {
        postIds: board.state.postIds
      });

      mark.asDone();
    }
  ],

  discard: [
    only.ifExists(),
    onlyIfBoardHasNotBeenDiscarded(),
    (board, command, mark) => {
      board.events.publish('discarded', {
        postIds: board.state.postIds
      });

      mark.asDone();
    }
  ]
};

const events = {
  mounted (board, event) {
    board.setState({
      title: event.data.title,
      slug: event.data.slug
    });
  },

  shared (board) {
    board.setState({
      isPrivate: false
    });
  },

  renamed (board, event) {
    board.setState({
      title: event.data.title
    });
  },

  pinnedPost (board, event) {
    board.setState({
      postIds: [ ...board.state.postIds, event.data.postId ]
    });
  },

  removedPost (board, event) {
    board.setState({
      postIds: board.state.postIds.filter(id => id !== event.data.postId)
    });
  },

  cleanedUp (board) {
    board.setState({
      postIds: []
    });
  },

  discarded (board) {
    board.setState({
      isDiscarded: true
    });
  }
};

module.exports = { initialState, commands, events };
