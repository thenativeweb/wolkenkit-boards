import { action } from 'mobx';
import services from '../../../services';

const edit = action(options => {
  const { boardsApi, overlay } = services;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.postId) {
    throw new Error('Post id is missing.');
  }
  if (!options.content) {
    throw new Error('Content is missing.');
  }

  const { postId, content } = options;

  return new Promise(resolve => {
    boardsApi.collaboration.post(postId).edit({
      content
    }).
      await('edited', () => resolve()).
      failed(err => {
        overlay.alert({
          text: err.message
        });
      });
  });
});

export default edit;
