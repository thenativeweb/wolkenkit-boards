import services from '../../services';

const isSlugAvailable = function (slug) {
  if (!slug) {
    throw new Error('Slug is missing.');
  }

  const { boardsApi } = services;

  return new Promise((resolve, reject) => {
    boardsApi.lists.boards.read({ where: { slug }}).
      finished(boards => {
        if (boards.length !== 0) {
          reject(boards[0]);
        } else {
          resolve();
        }
      });
  });
};

export default isSlugAvailable;
