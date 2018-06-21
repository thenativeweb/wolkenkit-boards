'use strict';

const fields = {
  boardId: { initialState: undefined },
  content: { initialState: '' },
  position: { initialState: undefined },
  color: { initialState: undefined },
  type: { initialState: undefined },
  creator: { initialState: undefined },
  isDone: { initialState: false }
};

const projections = {
  'collaboration.post.noted': (posts, event) => {
    posts.add({
      boardId: event.data.boardId,
      content: event.data.content,
      position: event.data.position,
      color: event.data.color,
      type: event.data.type,
      creator: event.data.creator,
      isDone: false
    });
  },

  'collaboration.board.pinnedPost': (posts, event) => {
    if (event.data.isPrivate) {
      return;
    }

    posts.authorize({
      where: { id: event.data.postId },
      forAuthenticated: true
    });
  },

  'collaboration.board.discarded': (posts, event) => {
    posts.remove({
      where: { boardId: event.aggregate.id }
    });
  },

  'collaboration.post.recolored': (posts, event) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { color: event.data.to }
    });
  },

  'collaboration.post.edited': (posts, event) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { content: event.data.content }
    });
  },

  'collaboration.post.moved': (posts, event) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { position: event.data.position }
    });
  },

  'collaboration.post.markedAsDone': (posts, event) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { isDone: true }
    });
  },

  'collaboration.post.thrownAway': (posts, event) => {
    posts.remove({
      where: { id: event.aggregate.id }
    });
  }
};

module.exports = { fields, projections };
