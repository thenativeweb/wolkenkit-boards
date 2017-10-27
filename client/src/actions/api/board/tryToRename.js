import boards from '../boards';
import rename from './rename';
import services from '../../../services';
import slugify from 'slugify';
import state from '../../../state';

const tryToRename = function ({ boardId, title }) {
  if (!boardId) {
    throw new Error('Board id is missing');
  }
  if (!title) {
    throw new Error('Title is missing');
  }

  return new Promise(resolve => {
    if (title === state.activeBoard.title) {
      return resolve();
    }

    boards.isSlugAvailable(slugify(title, { lower: true })).
      then(() => rename({ boardId, title })).
      then(event => resolve(event)).
      catch(() => {
        state.newTitle = state.activeBoard.title;

        services.overlay.alert({
          text: 'A board with that name already exists! Try another one.'
        });
      });
  });
};

export default tryToRename;
