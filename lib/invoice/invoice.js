const InvoiceSchema = require('../../model/invoice');
const { http_response } = require('../../config/http_responses');
const {get_order_info_to_invoice} = require('./functions');

class Invoice {
  async get_all_invoices() {
    try {
      const invoices = await InvoiceSchema.find().lean(true);
      return http_response(200, `Invoices info`, {invoices});
    } catch (error) {
      console.log('Error in get all invoices', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async get_invoice_by_id(id) {
    try {
      const {ordersPayed, ...invoice} = await InvoiceSchema.findById(id).lean(true);
      invoice.ordersPayed = await get_order_info_to_invoice(ordersPayed);
      return http_response(200, `Invoice info`, {invoice});
    } catch (error) {
      console.log('Error in get invoice by id', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async get_invoice_by_number(invoiceNumber) {
    try {
      const number = parseInt(invoiceNumber);
      const invoice = await InvoiceSchema.findOne({number});
      return http_response(200, `Invoice info`, {invoice});
    } catch (error) {
      console.log('Error in get invoice by number', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async create(body) {
    try {
      const new_invoice = new InvoiceSchema(body);
      const invoice_saved = await new_invoice.save();
      return http_response(201, 'Invoice created', {invoice: invoice_saved});
    } catch (error) {
      console.log('Error in create invoice', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async edit(id, body) {
    try {
      body.updatedAt = new Date();
      const invoice = await InvoiceSchema.findByIdAndUpdate(id, body, {new: true});
      return http_response(201, 'Invoice updated', {invoice});
    } catch (error) {
      console.log('Error in edit invoice', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

};

module.exports = Invoice;