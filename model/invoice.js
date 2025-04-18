const {Schema, model} = require('mongoose');

const invoiceSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  pricePayed: {
    type: Number,
  },
  outstandingBalance: {
    type: Number,
    default: 0,
  },
  prevInvoiceOutStandingBalance: {
    type: String,
  },
  prevOutStandingBalance: {
    type: Number,
  },
  clientName: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: String,
  },
  ordersPayed: {
    type: Array,
    required: true,
  },
  payed: {
    type: Boolean,
    default: false,
  },
  paymentType: {
    type: String,
  },
  payments: {
    type: Array,
  },
  checkNumber: {
    type: Number,
  },
}, {
  timestamps: true,
});

module.exports = model('invoices', invoiceSchema);