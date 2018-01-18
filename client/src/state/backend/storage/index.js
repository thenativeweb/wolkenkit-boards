import request from 'superagent';

/* eslint-disable no-process-env */
const host = process.env.STORAGE_HOST || 'local.wolkenkit.io',
      port = process.env.STORAGE_PORT || 3001;
/* eslint-enable no-process-env */

const storageEndPointUrl = `https://${host}:${port}/`;

const storage = {
  put (data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        return reject(new Error('Data is missing.'));
      }

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
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('Id is missing.'));
      }

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
