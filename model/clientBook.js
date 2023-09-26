const {Schema, model} = require('mongoose');

const clientBookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  bookPage: {
    type: Number,
  }
}, {
  timestamps: true
});

module.exports = model('clientsBook', clientBookSchema);