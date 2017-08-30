import { extendObservable } from 'mobx';
import services from '../../services';
import state from '../../state';

const readAndObserve = function () {
  const { boardsApi } = services;

  return new Promise(resolve => {
    boardsApi.lists.boards.readAndObserve({
      orderBy: { timestamp: 'descending' }
    }).
      started((boards, cancel) => {
        resolve(() => {
          cancel();

          extendObservable(state, {
            boards: []
          });
        });
      }).
      updated(boards => {
        extendObservable(state, {
          boards
        });
      });
  });
};

export default readAndObserve;
