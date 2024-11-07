const responseTemplate = require('./template');

const indexSuccess = (h, books) => {
  const body = {
    status: 'success',
    data: {
      books,
    },
  };
  return responseTemplate(h, body, 200);
};

const addSuccess = (h, bookId) => {
  const body = {
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId,
    },
  };
  return responseTemplate(h, body, 201);
};

const found = (h, book) => {
  const body = {
    status: 'success',
    data: {
      book,
    },
  };
  return responseTemplate(h, body, 200);
};

const updateSuccess = (h) => {
  const body = {
    status: 'success',
    message: 'Buku berhasil diperbarui',
  };
  return responseTemplate(h, body, 200);
};

const deleteSuccess = (h) => {
  const body = {
    status: 'success',
    message: 'Buku berhasil dihapus',
  };
  return responseTemplate(h, body, 200);
};

module.exports = {
  indexSuccess,
  addSuccess,
  found,
  updateSuccess,
  deleteSuccess,
};
