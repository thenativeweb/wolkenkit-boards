import fileStorage from '../fileStorage';
import state from '../state';

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

      api.collaboration.board().mount({ title }).
        await('mounted', resolve).
        failed(reject);
    });
  },

  async removePost ({ id, post }) {
    if (!id) {
      throw new Error('Id is missing.');
    }
    if (!post) {
      throw new Error('Post id is missing.');
    }
    if (!post.content) {
      throw new Error('Post content is missing.');
    }
    if (!post.type) {
      throw new Error('Post type is missing.');
    }

    const api = state.api;

    if (!api) {
      throw new Error('Not connected to backend.');
    }

    await new Promise((resolve, reject) => {
      api.collaboration.board(id).removePost({ postId: post.id }).
        await('removedPost', resolve).
        failed(reject);
    });

    if (post.type === 'image') {
      await fileStorage.removeFile({
        id: post.content.id
      });
    }
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

      api.collaboration.board(id).rename({ title }).
        await('renamed', resolve).
        failed(reject);
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
