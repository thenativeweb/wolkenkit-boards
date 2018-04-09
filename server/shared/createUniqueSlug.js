'use strict';

const slugify = require('slugify'),
      uuid = require('uuid/v4');

const createUniqueSlug = function (title) {
  if (!title || title === undefined) {
    throw new Error('Title is missing');
  }

  return `${uuid()}-${slugify(title, { lower: true })}`;
};

module.exports = createUniqueSlug;
