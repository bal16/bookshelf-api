const responseTemplate = (h, body, code) => {
  const response = h.response({
    ...body,
  });
  response.code(code);
  return response;
};

module.exports = responseTemplate;