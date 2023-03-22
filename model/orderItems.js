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
  lastModificatedAt: {
    type: Date,
    default: new Date(),
  },
}, {
  timestamps: true
});

module.exports = model('orderItems', orderItemSchema)