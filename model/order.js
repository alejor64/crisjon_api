const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
  client_id: {
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
  },
  due_date: {
    type: Date,
  },
  cad_number: {
    type: String,
    unique: true,
  },
  rush: { //URGENTE
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
  final_price: {
    type: Number,
    default: 0
  },
  deleted: {
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