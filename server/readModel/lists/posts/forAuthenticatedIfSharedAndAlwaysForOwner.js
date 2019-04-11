'use strict';

const forAuthenticatedIfSharedAndAlwaysForOwner = function () {
  return function (post, command, { client }) {
    if (post.isShared) {
      return client.user.id !== 'anonymous';
    }

    return post.owner === client.user.id;
  };
};

module.exports = forAuthenticatedIfSharedAndAlwaysForOwner;
