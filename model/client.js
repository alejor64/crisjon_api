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
  favorite: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  last_modificated_at:{
    type: Date,
    default: new Date(),
  }
});

module.exports = model('clients', clientSchema);