import getDepotClient from './getDepotClient';

/* eslint-disable no-process-env */
const host = process.env.STORAGE_HOST || 'local.wolkenkit.io',
      port = process.env.STORAGE_PORT || 3001;
/* eslint-enable no-process-env */

const storageEndPointUrl = `https://${host}:${port}/`;

const fileStorage = {
  async addFile ({ content, contentType, fileName }) {
    if (!content) {
      throw new Error('Content is missing.');
    }
    if (!contentType) {
      throw new Error('Content type is missing.');
    }
    if (!fileName) {
      throw new Error('File name is missing.');
    }

    const depotClient = getDepotClient({ host, port });

    const id = await depotClient.addFile({
      content,
      contentType,
      fileName
    });

    await depotClient.authorize({
      id,
      isAuthorized: {
        commands: {
        },
        queries: {
          getFile: { forAuthenticated: true, forPublic: true }
        }
      }
    });

    return {
      id,
      url: `${storageEndPointUrl}api/v1/file/${id}`
    };
  },

  async removeFile ({ id }) {
    if (!id) {
      throw new Error('Id is missing.');
    }

    const depotClient = getDepotClient({ host, port });

    await depotClient.removeFile({
      id
    });
  }
};

export default fileStorage;
