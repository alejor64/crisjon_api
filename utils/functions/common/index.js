const prepare_phone = (phone) => {
  return phone.replace(' ', '').replace('(', '').replace(')', '').replace('+', '').replace('-', '')
};

module.exports = {
  prepare_phone
};