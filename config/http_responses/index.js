const http_response = (status, msn, rest) => {
  return {
    status,
    msn,
    ...rest,
  };
};

module.exports = {
  http_response
};