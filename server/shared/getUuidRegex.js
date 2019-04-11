'use strict';

const uuid = require('uuidv4');

const getUuidRegex = function () {
  const uuidRegex = uuid.regex.v4.toString().slice(1, -1);

  return uuidRegex;
};

module.exports = getUuidRegex;
