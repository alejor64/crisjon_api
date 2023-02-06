const {Schema, model} = require('mongoose');

const orderServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastModificatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model('orderServices', orderServiceSchema)