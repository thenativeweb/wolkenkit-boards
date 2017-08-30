import request from 'superagent';

/* eslint-disable no-process-env */
const host = process.env.STORAGE_HOST || 'local.wolkenkit.io',
      port = process.env.STORAGE_PORT || 3002;
/* eslint-enable no-process-env */

const storageEndPointUrl = `https://${host}:${port}/`;

const storage = {
  put (data) {
    if (!data) {
      throw new Error('Data is missing.');
    }

    return new Promise((resolve, reject) => {
      request.post(storageEndPointUrl).
        send(data).
        end((err, res) => {
          if (err) {
            return reject(err);
          }
          if (res.status !== 200) {
            return reject(new Error('Failed to store image.'));
          }

          resolve({
            id: res.body.id,
            url: storageEndPointUrl + res.body.id
          });
        });
    });
  },

  delete (id) {
    if (!id) {
      throw new Error('Id is missing.');
    }

    return new Promise((resolve, reject) => {
      request.delete(storageEndPointUrl + id).
        send().
        end((err, res) => {
          if (err) {
            return reject(err);
          }
          if (res.status !== 200) {
            return reject(new Error('Failed to delete image.'));
          }

          resolve();
        });
    });
  }
};

export default storage;
