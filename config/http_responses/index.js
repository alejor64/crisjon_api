const http_response = (status, msn, rest) => {
  return {
    status,
    msn,
    ok: status >= 200 && status < 400,
    ...rest,
  };
};

module.exports = {
  http_response
};