import slugify from 'slugify';
import state from '../state';

const isTitleAvailable = function (title) {
  return new Promise((resolve, reject) => {
    if (!title) {
      return reject(new Error('Title is missing.'));
    }

    const api = state.api;

    if (!api) {
      return reject(new Error('Not connected to backend.'));
    }

    const slug = slugify(title, { lower: true });

    api.lists.boards.read({ where: { slug }}).
      finished(boards => {
        if (boards.length !== 0) {
          return reject(new Error('A board with this title already exists.'));
        }

        resolve(true);
      });
  });
};

const board = {
  cleanUp ({ id }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.board(id).cleanUp().
        await('cleanedUp', resolve).
        failed(reject);
    });
  },

  discard ({ id }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.board(id).discard().
        await('discarded', resolve).
        failed(reject);
    });
  },

  mount ({ title }) {
    return new Promise((resolve, reject) => {
      if (!title) {
        return reject(new Error('Title is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      isTitleAvailable(title).
        then(() => {
          api.collaboration.board().mount({ title }).
            await('mounted', resolve).
            failed(reject);
        }).
        catch(reject);
    });
  },

  removePost ({ id, postId }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }
      if (!postId) {
        return reject(new Error('Post id is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.board(id).removePost({ postId }).
        await('removedPost', resolve).
        failed(reject);
    });
  },

  rename ({ id, title }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }
      if (!title) {
        return reject(new Error('Title is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      isTitleAvailable(title).
        then(() => {
          api.collaboration.board().rename({ title }).
            await('renamed', resolve).
            failed(reject);
        }).
        catch(reject);
    });
  },

  share ({ id }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.board(id).share({ with: 'authenticated' }).
        await('shared', resolve).
        failed(reject);
    });
  }
};

export default board;
