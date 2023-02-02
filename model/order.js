const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
  job_id: {
    type: String,
    required: true,
    unique: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  client_job_name: {
    type: String
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
    required: true,
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
    default: false,
  },
  payment_date: {
    type: Date
  },
  payment_type: {
    type: String
  },
  check_number: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  final_price: {
    type: Number,
    default: 0
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  delivered_date: {
    type: String,
    default: new Date(),
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