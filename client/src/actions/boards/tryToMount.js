import boards from '../../actions/boards';
import mount from './mount';
import services from '../../services';
import slugify from 'slugify';
import state from '../../state';

const tryToMount = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.title) {
    throw new Error('Title is missing.');
  }

  const { title, isPrivate } = options;

  return new Promise((resolve, reject) => {
    boards.isSlugAvailable(slugify(title, { lower: true })).
      then(() => {
        mount({
          title,
          isPrivate
        }).
          then(resolve).
          catch(err => {
            services.overlay.alert(err.message);

            reject(err);
          });
      }).
      catch(() => {
        state.newBoardTitle = '';
        reject(new Error('A board with that name already exists! Try another one.'));
      });
  });
};

export default tryToMount;
