import state from '../state';
import storage from '../storage';

const post = {
  edit ({ id, content }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }
      if (!content) {
        return reject(new Error('Content is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.post(id).edit({ content }).
        await('edited', resolve).
        failed(reject);
    });
  },

  markAsDone ({ id }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.post(id).markAsDone().
        await('markedAsDone', resolve).
        failed(reject);
    });
  },

  move ({ id, position }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }
      if (!position || !position.left || !position.top) {
        throw new Error('Position is missing.');
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.post(id).move({ position }).
        await('moved', resolve).
        failed(reject);
    });
  },

  noteImage ({ boardId, color, content, position }) {
    return new Promise((resolve, reject) => {
      if (!boardId) {
        return reject(new Error('Board id is missing.'));
      }
      if (!color) {
        return reject(new Error('Color is missing.'));
      }
      if (!content) {
        return reject(new Error('Content is missing.'));
      }
      if (!position || !position.left || !position.top) {
        throw new Error('Position is missing.');
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      storage.put(content).
        then(object => {
          api.collaboration.post().note({
            boardId,
            content: object,
            color,
            type: 'image',
            position
          }).
            await('noted', resolve).
            failed(reject);
        }).
        catch(reject);
    });
  },

  noteText ({ boardId, color, content, position }) {
    return new Promise((resolve, reject) => {
      if (!boardId) {
        return reject(new Error('Board id is missing.'));
      }
      if (!color) {
        return reject(new Error('Color is missing.'));
      }
      if (!content) {
        return reject(new Error('Content is missing.'));
      }
      if (!position || !position.left || !position.top) {
        throw new Error('Position is missing.');
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.post().note({
        boardId,
        content,
        color,
        type: 'text',
        position
      }).
        await('noted', resolve).
        failed(reject);
    });
  },

  recolor ({ id, to }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }
      if (!to) {
        throw new Error('New color is missing.');
      }

      const api = state.api;

      if (!api) {
        return reject(new Error('Not connected to backend.'));
      }

      api.collaboration.post(id).recolor({ to }).
        await('recolored', resolve).
        failed(reject);
    });
  }
};

export default post;
