const {token_key} = require('../../config/index');
const jwt = require('jsonwebtoken');

const generate_token = (payload) => {
  return jwt.sign(payload, token_key);
};

const verify_token = (token) => {
  return jwt.verify(token, token_key);
};

module.exports = {
  generate_token,
  verify_token
};