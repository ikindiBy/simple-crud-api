const { version: uuidVersion } = require('uuid');
const { validate: uuidValidate } = require('uuid');

const isIdValid = (id) => uuidValidate(id) && uuidVersion(id) === 4;

module.exports = { isIdValid };
