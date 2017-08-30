import services from '../../services';

const observeEvents = function () {
  const { boardsApi, overlay } = services;

  return new Promise(resolve => {
    boardsApi.events.observe({
      where: { name: 'mounted' }
    }).
      started(cancel => {
        resolve(cancel);
      }).
      received(() => {
        overlay.alert({
          text: 'A new board has been mounted.'
        });
      });
  });
};

export default observeEvents;
