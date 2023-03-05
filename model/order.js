const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
  jobId: {
    type: String,
    required: true,
    unique: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  clientJobName: {
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
  dueDate: {
    type: Date,
  },
  cadNumber: {
    type: String,
  },
  rush: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
  note: {
    type: String,
  },
  payed: {
    type: Boolean,
    default: false,
  },
  paymentDate: {
    type: Date
  },
  paymentType: {
    type: String
  },
  checkNumber: {
    type: Number,
  },
  status: {
    type: String,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deliveredDate: {
    type: Date,
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

module.exports = model('orders', orderSchema);