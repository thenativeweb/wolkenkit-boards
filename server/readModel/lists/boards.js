'use strict';

const fields = {
  title: { initialState: '' },
  slug: { initialState: '', fastLookup: true },
  isPrivate: { initialState: true },
  timestamp: { initialState: 0 }
};

const when = {
  'collaboration.board.mounted': (boards, event, mark) => {
    boards.add({
      title: event.data.title,
      slug: event.data.slug,
      timestamp: event.metadata.timestamp
    });
    mark.asDone();
  },

  'collaboration.board.shared': (boards, event, mark) => {
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
    mark.asDone();
  },

  'collaboration.board.renamed': (boards, event, mark) => {
    boards.update({
      where: { id: event.aggregate.id },
      set: {
        title: event.data.title,
        slug: event.data.slug
      }
    });
    mark.asDone();
  },

  'collaboration.board.discarded': (boards, event, mark) => {
    boards.remove({
      where: { id: event.aggregate.id }
    });
    mark.asDone();
  }
};

module.exports = { fields, when };
