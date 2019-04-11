'use strict';

const forAuthenticatedIfSharedAndAlwaysForOwner = require('./forAuthenticatedIfSharedAndAlwaysForOwner');

const fields = {
  owner: { initialState: undefined },
  title: { initialState: '' },
  slug: { initialState: '', fastLookup: true },
  isShared: { initialState: false },
  timestamp: { initialState: 0 }
};

const projections = {
  'collaboration.board.mounted' (boards, event) {
    boards.add({
      owner: event.initiator.id,
      title: event.data.title,
      slug: event.data.slug,
      timestamp: event.metadata.timestamp
    });
  },

  'collaboration.board.shared' (boards, event) {
    boards.update({
      where: { id: event.aggregate.id },
      set: {
        isShared: true
      }
    });
  },

  'collaboration.board.renamed' (boards, event) {
    boards.update({
      where: { id: event.aggregate.id },
      set: {
        title: event.data.title,
        slug: event.data.slug
      }
    });
  },

  'collaboration.board.discarded' (boards, event) {
    boards.remove({
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
