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

const when = {
  'collaboration.post.noted': (posts, event, mark) => {
    posts.add({
      boardId: event.data.boardId,
      content: event.data.content,
      position: event.data.position,
      color: event.data.color,
      type: event.data.type,
      creator: event.data.creator,
      isDone: false
    });
    mark.asDone();
  },

  'collaboration.board.pinnedPost': (posts, event, mark) => {
    if (!event.data.isPrivate) {
      posts.authorize({
        where: { id: event.data.postId },
        forAuthenticated: true
      });
    }

    mark.asDone();
  },

  'collaboration.board.discarded': (posts, event, mark) => {
    posts.remove({
      where: { boardId: event.aggregate.id }
    });
    mark.asDone();
  },

  'collaboration.post.recolored': (posts, event, mark) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { color: event.data.to }
    });
    mark.asDone();
  },

  'collaboration.post.edited': (posts, event, mark) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { content: event.data.content }
    });
    mark.asDone();
  },

  'collaboration.post.moved': (posts, event, mark) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { position: event.data.position }
    });
    mark.asDone();
  },

  'collaboration.post.markedAsDone': (posts, event, mark) => {
    posts.update({
      where: { id: event.aggregate.id },
      set: { isDone: true }
    });
    mark.asDone();
  },

  'collaboration.post.thrownAway': (posts, event, mark) => {
    posts.remove({
      where: { id: event.aggregate.id }
    });
    mark.asDone();
  }
};

module.exports = { fields, when };
