const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String
  },
  zip_code: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: new Date(),
  },
  email: {
    type: String,
    unique: true,
  },
});

module.exports = model('clients', clientSchema);