const generateCurrentTime = () => new Date().toISOString();

const hasContains = (string, substring) =>
  string.toLowerCase().includes(decodeURI(substring).toLowerCase());

const formatIndex = (books) =>
  books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

module.exports = { generateCurrentTime, hasContains, formatIndex };
