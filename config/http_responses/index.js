const http_response = (status, msn, rest) => {
  console.log('REST', rest)
  return {
    status,
    msn,
    ...rest,
  };
};

module.exports = {
  http_response
};