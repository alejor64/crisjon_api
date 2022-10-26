const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
  customer_id: {
    type: String,
    unique: true,
    required: true,
  },
  created_date: {
    type: String,
    default: new Date(),
  },
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  item: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  cad_number: {
    type: String,
    unique: True,
  },
  rush: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
  payed: {
    type: Boolean,
  },
  paymente_date: {
    type: Date
  },
  status: {
    type: String,
    required: true,
  },
  returned: {
    type: Boolean,
    default: false,
  }
});

module.exports = model('orders', orderSchema);