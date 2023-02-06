const {Schema, model} = require('mongoose');

const orderItemSchema = new Schema({
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

module.exports = model('orderItems', orderItemSchema)