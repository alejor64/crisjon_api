const dotenv = require('dotenv').config();

const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongo_user: process.env.MONGO_USER,
  mongo_password: process.env.MONGO_PASSWORD,
  mongo_keyword: process.env.MONGO_KEYWORD,
  mongo_db: process.env.MONGO_DB,
  token_key: process.env.TOKEN_KEY
};

module.exports = config;