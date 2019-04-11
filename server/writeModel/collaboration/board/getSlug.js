'use strict';

const slugify = require('slugify'),
      uuid = require('uuidv4');

const getSlug = function (title) {
  if (!title || title === undefined) {
    throw new Error('Title is missing.');
  }

  const uniqueId = uuid().substring(0, 8);

  return `${slugify(title, { lower: true })}-${uniqueId}`;
};

module.exports = getSlug;
