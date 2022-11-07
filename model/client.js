const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String
  },
  fein: {
    type: String,
    required: true,
    unique: true,
  },
  zip_code: {
    type: Number,
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