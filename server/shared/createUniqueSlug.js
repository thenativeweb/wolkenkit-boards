'use strict';

const slugify = require('slugify'),
      uuid = require('uuid/v4');

const createUniqueSlug = function (title) {
  if (!title || title === undefined) {
    throw new Error('Title is missing');
  }

  return `${slugify(title, { lower: true })}-${uuid().substring(0, 8)}`;
};

module.exports = createUniqueSlug;
