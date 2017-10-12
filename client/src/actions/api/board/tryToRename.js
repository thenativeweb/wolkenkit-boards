import boards from '../boards';
import rename from './rename';
import slugify from 'slugify';
import state from '../../../state';

const tryToRename = function ({ boardId, title }) {
  if (!boardId) {
    throw new Error('Board id is missing');
  }
  if (!title) {
    throw new Error('Title is missing');
  }

  if (title === state.activeBoard.title) {
    return;
  }

  return new Promise((resolve, reject) => {
    boards.isSlugAvailable(slugify(title, { lower: true })).
      then(() => rename(title)).
      catch(() => {
        state.newBoardTitle = state.activeBoard.title;

        reject(new Error('A board with that name already exists! Try another one.'));
      });
  });
};

export default tryToRename;
