const bcryptjs = require('bcryptjs');

const generate_password = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

const compare_password = (hash, password) => {
  return bcryptjs.compareSync(password, hash);;
};

module.exports = {
  generate_password,
  compare_password
}