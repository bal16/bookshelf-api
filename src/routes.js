const { addBook, getAllBook } = require('./handler');
const { getBookById } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  //   {
  //     method: 'PUT',
  //     path: '/books/{id}',
  //     handler: editBookById,
  //   },
  //   {
  //     method: 'DELETE',
  //     path: '/books/{id}',
  //     handler: deleteBookById,
  //   },
];

module.exports = routes;
