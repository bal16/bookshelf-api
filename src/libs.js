const { nanoid } = require('nanoid');

const generateId = () => nanoid(16);

module.exports = {
  generateId,
};