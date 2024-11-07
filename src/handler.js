const books = require('./books');
const { generateId } = require('./libs');
const Response = require('./response');
const { generateCurrentTime, hasContains, formatIndex } = require('./services');

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  if (!name)
    return Response.addFail(h, 'Gagal menambahkan buku. Mohon isi nama buku');
  if (readPage > pageCount)
    return Response.addFail(
      h,
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    );
  const insertedAt = generateCurrentTime();
  const updatedAt = insertedAt;
  const newBook = {
    id: generateId(),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount == readPage || false,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  return Response.addSuccess(h, newBook.id);
};

const getAllBook = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const indexedBooks = books.filter((book) => hasContains(book.name, name));
    if (books.length === 0) return Response.notFound(h);
    return Response.indexSuccess(h, formatIndex(indexedBooks));
  }

  if (reading) {
    // console.log(typeof reading);
    const indexedBooks = books.filter(
      (book) => Number(book.reading) === Number(reading)
    );
    if (books.length === 0) return Response.notFound(h);
    return Response.indexSuccess(h, formatIndex(indexedBooks));
  }

  if (finished) {
    // console.log(typeof finished);
    const indexedBooks = books.filter(
      (book) => Number(book.finished) === Number(finished)
    );
    if (books.length === 0) return Response.notFound(h);
    return Response.indexSuccess(h, formatIndex(indexedBooks));
  }

  return Response.indexSuccess(h, books);
};

const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];
  if (!book) return Response.notFound(h);
  return Response.found(h, book);
};

const editBookById = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name)
    return Response.updateFail(
      h,
      'Gagal memperbarui buku. Mohon isi nama buku'
    );

  if (readPage > pageCount)
    return Response.updateFail(
      h,
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    );

  const updatedAt = generateCurrentTime();
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1)
    return Response.notFound(h, 'Gagal memperbarui buku. Id tidak ditemukan');

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount == readPage || false,
    reading,
    updatedAt,
  };

  return Response.updateSuccess(h);
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1)
    return Response.notFound(h, 'Buku gagal dihapus. Id tidak ditemukan');
  books.splice(bookIndex, 1);
  return Response.deleteSuccess(h);
};

module.exports = {
  addBook,
  getAllBook,
  getBookById,
  editBookById,
  deleteBookById,
};
