const invoiceSchema = require('../../../model/invoice');

const invoice_id = async (invoiceId = '') => {
  const invoice = await invoiceSchema.findById(invoiceId);
  if(!invoice) throw new Error(`The invoice ${invoiceId} does not exist`);
};

const invoice_number = async (invoiceNumber = 0) => {
  const number = parseInt(invoiceNumber)
  const invoice = await invoiceSchema.findOne({number});
  if(!invoice) throw new Error(`The invoice number ${number} does not exist`);
};

const invoice_new_number = async (invoiceNumber = 0) => {
  const number = parseInt(invoiceNumber)
  const invoice = await invoiceSchema.findOne({number});
  if(invoice) throw new Error(`The invoice number ${number} already exist`);
};

const orders_payed = async (ordersPayed = []) => {
  if(ordersPayed.length <= 0) throw new Error(`Invoice need orders to pay`);
};

module.exports = {
  invoice_id,
  invoice_number,
  invoice_new_number,
  orders_payed,
};