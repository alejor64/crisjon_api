const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
  customer_id: {
    type: String,
    unique: true,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  item: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  cad_number: {
    type: String,
    unique: true,
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
  },
  created_at: {
    type: String,
    default: new Date(),
  },
  last_modificated_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model('orders', orderSchema);