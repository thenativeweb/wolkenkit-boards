'use strict';

const fields = {
  title: { initialState: '' },
  slug: { initialState: '', fastLookup: true },
  isPrivate: { initialState: true },
  timestamp: { initialState: 0 }
};

const projections = {
  'collaboration.board.mounted': (boards, event) => {
    boards.add({
      title: event.data.title,
      slug: event.data.slug,
      timestamp: event.metadata.timestamp
    });
  },

  'collaboration.board.shared': (boards, event) => {
    boards.authorize({
      where: { id: event.aggregate.id },
      forAuthenticated: true
    });
    boards.update({
      where: { id: event.aggregate.id },
      set: {
        isPrivate: false
      }
    });
  },

  'collaboration.board.renamed': (boards, event) => {
    boards.update({
      where: { id: event.aggregate.id },
      set: {
        title: event.data.title,
        slug: event.data.slug
      }
    });
  },

  'collaboration.board.discarded': (boards, event) => {
    boards.remove({
      where: { id: event.aggregate.id }
    });
  }
};

module.exports = { fields, projections };
