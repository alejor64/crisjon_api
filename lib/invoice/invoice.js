const moment = require('moment');
const InvoiceSchema = require('../../model/invoice');
const ClientSchema = require('../../model/client');
const OrderSchema = require('../../model/order');
const { http_response } = require('../../config/http_responses');
const {get_order_info_to_invoice} = require('./functions');
const { mark_orders_as_payed, mark_invoice_in_orders } = require('../order/functions');

class Invoice {
  async get_all_invoices() {
    try {
      const invoices = await InvoiceSchema.find().sort({createdAt: -1}).lean(true);
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

  async get_invoice_by_client_name(clientName, startDate, endDate) {
    try {
      const startDay = moment(startDate).format("YYYY-MM-DD");
      const endDay = moment(endDate).format("YYYY-MM-DD");
      const invoices = await InvoiceSchema.find({
        clientName,
        startDate: {$gte: startDay},
        endDate: {$lte: endDay},
      }).sort({createdAt: -1});
      return http_response(200, `Invoices info`, {invoices});
    } catch (error) {
      console.log('Error in get invoice by client name', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async create(body) {
    try {
      const new_invoice = new InvoiceSchema(body);
      const invoice_saved = await new_invoice.save();
      await mark_invoice_in_orders(body.ordersPayed, invoice_saved._id)
      return http_response(201, 'Invoice created', {invoice: invoice_saved});
    } catch (error) {
      console.log('Error in create invoice', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async edit(id, body) {
    try {
      body.updatedAt = new Date();
      const outstandingBalance = body.totalPrice - body.pricePayed;
      body.outstandingBalance = outstandingBalance > 0 ? outstandingBalance : 0;
      body.payed = !Math.abs(outstandingBalance)
      if (body.prevInvoiceOutStandingBalance) {
        const prevInvoice = await InvoiceSchema.findById(body.prevInvoiceOutStandingBalance)
        const pendingBalance = body.pricePayed - prevInvoice.outstandingBalance
        if (pendingBalance >= 0) {
          await InvoiceSchema.findByIdAndUpdate(prevInvoice._id, {outstandingBalance: 0, payed: true})
        } else  {
          await InvoiceSchema.findByIdAndUpdate(prevInvoice._id, {outstandingBalance: Math.abs(pendingBalance), payed: false})
        }
      }
      const invoice = await InvoiceSchema.findByIdAndUpdate(id, body, {new: true});
      await ClientSchema.findOneAndUpdate({name: body.clientName}, {
        outstandingBalance,
        outstandingBalanceInvoice: outstandingBalance > 0 ? id : "",
        dateOutStandingBalance: new Date()
      })
      await mark_orders_as_payed(body.orders, body.paymentType, body.checkNumber, id)
      return http_response(201, 'Invoice updated', {invoice});
    } catch (error) {
      console.log('Error in edit invoice', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

  async deleteById(id){
    try {
      const invoice_deleted = await InvoiceSchema.findByIdAndDelete(id).lean(true);
      await mark_invoice_in_orders(invoice_deleted.ordersPayed, "")
      const invoice_pending_balance = invoice_deleted.totalPrice - invoice_deleted.pricePayed;
      const { _id, outstandingBalance } = await ClientSchema.findOne({name: invoice_deleted.clientName});
      const total_pending_balance = outstandingBalance > invoice_pending_balance ? outstandingBalance - invoice_pending_balance : 0;
      await ClientSchema.findByIdAndUpdate(_id, {outstandingBalance: total_pending_balance});
      await Promise.all(invoice_deleted.ordersPayed.map(async(order) => await OrderSchema.findByIdAndUpdate(order._id, {payed: false, paymentDate: "", invoice: null})))
      return http_response(200, `Invoice ${invoice_deleted.number} deleted successfully`, {invoice: invoice_deleted});
    } catch (error) {
      console.log('Error in delete invoice by id', error);
      return http_response(500, 'Internal server error', {error});
    }
  };

};

module.exports = Invoice;