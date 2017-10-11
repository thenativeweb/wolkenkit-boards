import { extendObservable } from 'mobx';
import services from '../../services';
import state from '../../state';

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
              activeBoard: boards[0],
              newBoardTitle: boards[0].title
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

        const cancel = () => {
          subscriptions.forEach(cancelSubscription => {
            cancelSubscription();
          });

          extendObservable(state, {
            activeBoard: undefined,
            posts: [],
            newBoardTitle: undefined
          });
        };

        resolve(cancel);
      }).
      failed(err => reject(err));
  });
};

export default readAndObserve;
