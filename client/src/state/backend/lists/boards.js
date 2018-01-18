import { extendObservable } from 'mobx';
import state from '../state';

const boards = {
  unsubscribe: undefined,

  stopReading () {
    if (boards.unsubscribe) {
      boards.unsubscribe();
      boards.unsubscribe = undefined;
    }

    extendObservable(state.lists, {
      boards: []
    });
  },

  startReading () {
    return new Promise((resolve, reject) => {
      boards.stopReading();

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.lists.boards.readAndObserve({
        orderBy: { timestamp: 'descending' }
      }).
        started((items, cancel) => {
          extendObservable(state.lists, { boards: items });
          boards.unsubscribe = cancel;
          resolve();
        }).
        updated(items => {
          extendObservable(state.lists, { boards: items });
        }).
        failed(reject);
    });
  }
};

export default boards;
