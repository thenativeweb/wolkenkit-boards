import { extendObservable } from 'mobx';
import services from '../../../services';
import state from '../../../state';

const readAndObserve = function (slug) {
  const { boardsApi } = services;

  return new Promise((resolve, reject) => {
    const subscriptions = [];

    boardsApi.lists.boards.readOne({ where: { slug }}).
      finished(board => {
        state.activeBoardId = board.id;
        subscriptions.length = 0;

        boardsApi.lists.boards.readAndObserve({
          where: { id: state.activeBoardId },
          take: 1
        }).
        started((boards, cancel) => {
          subscriptions.push(cancel);
        }).
        updated(boards => {
          if (boards[0]) {
            extendObservable(state, {
              activeBoard: boards[0]
            });
          }
        });

        boardsApi.lists.posts.readAndObserve({
          where: { boardId: state.activeBoardId }
        }).
        started((posts, cancel) => {
          extendObservable(state, {
            posts
          });

          subscriptions.push(cancel);
        }).
        updated(posts => {
          extendObservable(state, {
            posts
          });
        });

        const unsubscribe = () => {
          subscriptions.forEach(cancel => {
            cancel();
          });

          extendObservable(state, {
            activeBoard: undefined,
            posts: []
          });
        };

        resolve(unsubscribe);
      }).
      failed(err => reject(err));
  });
};

export default readAndObserve;
