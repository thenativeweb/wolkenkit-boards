import boards from '../boards';
import mount from './mount';
import services from '../../../services';
import slugify from 'slugify';
import state from '../../../state';

const tryToMount = function ({ title, isPrivate }) {
  if (!title) {
    throw new Error('Title is missing.');
  }

  const { overlay } = services;

  return new Promise((resolve, reject) => {
    boards.isSlugAvailable(slugify(title, { lower: true })).
      then(() => {
        mount({
          title,
          isPrivate
        }).
          then(resolve).
          catch(err => {
            overlay.alert(err.message);

            reject(err);
          });
      }).
      catch(() => {
        state.newBoardTitle = '';

        overlay.alert({
          text: 'A board with that name already exists! Try another one.'
        });
      });
  });
};

export default tryToMount;
