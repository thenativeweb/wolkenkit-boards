import backend from '../backend';
import { extendObservable } from 'mobx';
import state from './state';

const startReading = function (slug) {
  return new Promise((resolve, reject) => {
    if (!slug) {
      return reject(new Error('Slug is missing.'));
    }

    const api = backend.state.api;

    if (!api) {
      return reject(new Error('Not connected to backend.'));
    }

    const subscriptions = [];

    api.lists.boards.readOne({ where: { slug }}).
      finished(board => {
        api.lists.boards.readAndObserve({
          where: { id: board.id },
          take: 1
        }).
        started((boards, cancel) => {
          subscriptions.push(cancel);
        }).
        updated(boards => {
          const activeBoard = boards[0];

          if (activeBoard) {
            extendObservable(state, {
              id: activeBoard.id,
              title: activeBoard.title,
              slug: activeBoard.slug
            });
          }
        });

        api.lists.posts.readAndObserve({
          where: { boardId: board.id }
        }).
        started((posts, cancel) => {
          subscriptions.push(cancel);
        }).
        updated(posts => {
          extendObservable(state, {
            posts
          });
        });

        const stopReading = () => {
          subscriptions.forEach(cancel => cancel());

          extendObservable(state, {
            id: undefined,
            title: undefined,
            slug: undefined,
            posts: []
          });
        };

        resolve(stopReading);
      }).
      failed(reject);
  });
};

export default startReading;
