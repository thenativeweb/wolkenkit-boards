import { extendObservable } from 'mobx';
import services from '../../../services';
import state from '../../../state';

const readAndObserve = function () {
  const { boardsApi, overlay } = services;

  return new Promise(resolve => {
    const subscriptions = [];

    boardsApi.events.observe({
      where: { name: 'mounted' }
    }).
      started(cancel => {
        subscriptions.push(cancel);
      }).
      received(() => {
        overlay.alert({
          text: 'A new board has been mounted.'
        });
      });

    boardsApi.lists.boards.readAndObserve({
      orderBy: { timestamp: 'descending' }
    }).
      started((boards, cancel) => {
        subscriptions.push(cancel);
      }).
      updated(boards => {
        extendObservable(state, {
          boards
        });
      });

    const unsubscribe = () => {
      subscriptions.forEach(cancel => {
        cancel();
      });

      extendObservable(state, {
        boards: []
      });
    };

    resolve(unsubscribe);
  });
};

export default readAndObserve;
