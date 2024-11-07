const responseTemplate = require('./template');

const addFail = (h, message) => {
  const body = {
    status: 'fail',
    message,
  };
  return responseTemplate(h, body, 400);
};

const notFound = (h, message = 'Buku tidak ditemukan') => {
  const body = {
    status: 'fail',
    message,
  };
  return responseTemplate(h, body, 404);
};

const updateFail = (h, message) => {
  const body = {
    status: 'fail',
    message,
  };
  return responseTemplate(h, body, 400);
};

module.exports = {
  addFail,
  notFound,
  updateFail,
};
