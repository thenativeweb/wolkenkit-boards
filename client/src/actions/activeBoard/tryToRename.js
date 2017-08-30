import boards from '../../actions/boards';
import rename from './rename';
import services from '../../services';
import slugify from 'slugify';
import state from '../../state';

const tryToRename = function (newTitle) {
  if (newTitle === '') {
    state.newBoardTitle = state.activeBoard.title;

    return;
  }

  if (!newTitle) {
    throw new Error('Title is missing');
  }

  if (newTitle === state.activeBoard.title) {
    return false;
  }

  boards.isSlugAvailable(slugify(newTitle, { lower: true })).
    then(() => {
      rename(newTitle);
    }).
    catch(() => {
      services.overlay.alert({
        text: 'A board with that name already exists! Try another one.'
      });

      state.newBoardTitle = state.activeBoard.title;
    });
};

export default tryToRename;
