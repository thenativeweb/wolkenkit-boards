'use strict';

const forAuthenticatedIfSharedAndAlwaysForOwner = require('./forAuthenticatedIfSharedAndAlwaysForOwner');

const fields = {
  owner: { initialState: undefined },
  boardId: { initialState: undefined },
  content: { initialState: '' },
  type: { initialState: undefined },
  color: { initialState: undefined },
  position: { initialState: undefined },
  creator: { initialState: undefined },
  isShared: { initialState: false },
  isDone: { initialState: false }
};

const projections = {
  'collaboration.post.noted' (posts, event) {
    posts.add({
      owner: event.initiator.id,
      boardId: event.data.boardId,
      content: event.data.content,
      position: event.data.position,
      color: event.data.color,
      type: event.data.type,
      creator: event.data.creator
    });
  },

  'collaboration.board.postPinned' (posts, event) {
    posts.update({
      where: { id: event.data.postId },
      set: { isShared: event.data.isShared }
    });
  },

  'collaboration.board.shared' (posts, event) {
    posts.update({
      where: { boardId: event.aggregate.id },
      set: { isShared: true }
    });
  },

  'collaboration.board.discarded' (posts, event) {
    posts.remove({
      where: { boardId: event.aggregate.id }
    });
  },

  'collaboration.post.recolored' (posts, event) {
    posts.update({
      where: { id: event.aggregate.id },
      set: { color: event.data.to }
    });
  },

  'collaboration.post.edited' (posts, event) {
    posts.update({
      where: { id: event.aggregate.id },
      set: { content: event.data.content }
    });
  },

  'collaboration.post.moved' (posts, event) {
    posts.update({
      where: { id: event.aggregate.id },
      set: { position: event.data.position }
    });
  },

  'collaboration.post.markedAsDone' (posts, event) {
    posts.update({
      where: { id: event.aggregate.id },
      set: { isDone: true }
    });
  },

  'collaboration.post.thrownAway' (posts, event) {
    posts.remove({
      where: { id: event.aggregate.id }
    });
  }
};

const queries = {
  readItem: {
    isAuthorized: forAuthenticatedIfSharedAndAlwaysForOwner()
  }
};

module.exports = { fields, projections, queries };
