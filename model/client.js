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
  state: {
    type: String,
  },
  fein: {
    type: String,
  },
  zipCode: {
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
  sst: {
    type: Number,
  },
  taxIdNumber: {
    type: Number,
  },
  lastModificatedAt:{
    type: Date,
    default: new Date(),
  }
}, {
  timestamps: true
});

module.exports = model('clients', clientSchema);