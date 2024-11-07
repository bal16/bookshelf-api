const {
  indexSuccess,
  addSuccess,
  found,
  updateSuccess,
  deleteSuccess,
} = require('./success');

const { addFail, notFound, updateFail, deleteFail } = require('./fail');

module.exports = {
  indexSuccess,
  addSuccess,
  addFail,
  found,
  notFound,
  updateSuccess,
  updateFail,
  deleteSuccess,
  deleteFail,
};
