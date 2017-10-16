import api from '../index';
import services from '../../../services';
import slugify from 'slugify';

const tryToMount = function ({ title, isPrivate }) {
  if (!title) {
    throw new Error('Title is missing.');
  }

  const { overlay } = services;

  return new Promise((resolve, reject) => {
    api.boards.isSlugAvailable(slugify(title, { lower: true })).
      then(() => {
        api.board.mount({
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
        overlay.alert({
          text: 'A board with that name already exists! Try another one.'
        });
      });
  });
};

export default tryToMount;
