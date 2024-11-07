const books = require('./data/books');
const { generateId } = require('./libs');
const Response = require('./response');

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
  } = request.payload;
  if (!name)
    return Response.addFail(h, 'Gagal menambahkan buku. Mohon isi nama buku');
  if (readPage > pageCount)
    return Response.addFail(
      h,
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    );
  const insertedAt = new Date().toISOString();
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
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  return Response.addSuccess(h, newBook.id);
};

const getAllBook = (request, h) => {
  const indexedBooks = books;
  //   const { name, reading, finished } = request.query;
  //   let indexedBooks = books;
  //   if (name) {
  //     indexedBooks = books.filter((book) => (book.name) === decodeURI(name));
  //     if (indexedBooks.length === 0) return Response.notFound(h);
  //     return Response.indexSuccess(h, indexedBooks);
  //   }

  //   if (reading) {
  //     indexedBooks = books.filter((book) => book.reading === true);
  //     if (indexedBooks.length === 0) return Response.notFound(h);
  //     return Response.indexSuccess(h, indexedBooks);
  //   }

  //   if (finished) {
  //     indexedBooks = books.filter((book) => book.finished === true);
  //     if (indexedBooks.length === 0) return Response.notFound(h);
  //     return Response.indexSuccess(h, indexedBooks);
  //   }

  return Response.indexSuccess(h, indexedBooks);
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
    finished,
    reading,
  } = request.payload;
  if (!name)
    return Response.updateFail(h, 'Gagal memperbarui buku. Mohon isi nama buku');
  if (readPage > pageCount)
    return Response.updateFail(
      h,
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    );
  const updatedAt = new Date().toISOString();
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) return Response.notFound(h);
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };
  return Response.updateSuccess(h);
};

module.exports = { addBook, getAllBook, getBookById, editBookById };
