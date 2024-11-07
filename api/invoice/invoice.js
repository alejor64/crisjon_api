const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token} = require('../../middlewares/index');
const {
  invoice_number,
  invoice_id,
  invoice_new_id,
  orders_payed,
} = require('../../utils/functions/db_validations/invoice');
const {client_by_name_exits} = require('../../utils/functions/db_validations/client');
const {REGEX_DATE} = require('../../utils/constants/index');
const Invoice = require('../../lib/invoice/invoice');
const invoice = new Invoice();

router.get('/', [validate_token], async (req, res) => {
  const {status, ...rest} = await invoice.get_all_invoices();
  return res.status(status).json(rest);
});

router.get('/:invoiceId', [
  validate_token,
  check('invoiceId', 'invoice id is required').not().isEmpty(),
  check('invoiceId').isMongoId(),
  check('invoiceId').custom(invoice_id),
  validate_fields,
], async (req, res) => {
  const {invoiceId} =req.params;
  const {status, ...rest} = await invoice.get_invoice_by_id(invoiceId);
  return res.status(status).json(rest);
});

router.get('/number/:invoiceNumber', [
  validate_token,
  check('invoiceNumber', 'invoice Number is required').not().isEmpty(),
  check('invoiceNumber').custom(invoice_number),
  validate_fields,
], async (req, res) => {
  const {invoiceNumber} =req.params;
  const {status, ...rest} = await invoice.get_invoice_by_number(invoiceNumber);
  return res.status(status).json(rest);
});

router.get('/client/:clientName', [
  validate_token,
  check('clientName', 'Client name is required').not().isEmpty(),
  check('clientName').custom(client_by_name_exits),
  validate_fields
], async(req, res) => {
  const {params: {clientName}, query: {startDate, endDate}} = req
  const {status, ...rest} = await invoice.get_invoice_by_client_name(clientName, startDate, endDate);
  return res.status(status).json(rest);
})

router.post('/create', [
  validate_token,
  check('number', 'Number is required').not().isEmpty(),
  check('id', 'Id is required').not().isEmpty(),
  check('id').custom((number, { req }) => invoice_new_id(number, req.body)),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('startDate', 'Invalid date').matches(REGEX_DATE),
  check('endDate', 'End date is required').not().isEmpty(),
  check('endDate', 'Invalid date').matches(REGEX_DATE),
  check('clientName', 'Client name is required').not().isEmpty(),
  check('clientName').custom(client_by_name_exits),
  check('totalPrice', 'Total price is required').not().isEmpty(),
  check('ordersPayed', 'Orders payed is required').not().isEmpty(),
  check('ordersPayed').custom(orders_payed),
  validate_fields,
], async (req, res) => {
  const {body} = req;
  const {status, ...rest} = await invoice.create(body);
  return res.status(status).json(rest);
});

router.put('/edit/:invoiceId', [
  validate_token,
  check('invoiceId', 'invoice id is required').not().isEmpty(),
  check('invoiceId').isMongoId(),
  check('invoiceId').custom(invoice_id),
  check('number').custom(invoice_number),
  validate_fields,
], async (req, res) => {
  const {invoiceId} = req.params;
  const {body} = req;
  const {status, ...rest} = await invoice.edit(invoiceId, body)
  return res.status(status).json(rest);
});

router.delete('/delete/:invoiceId', [
  validate_token,
  check('invoiceId', 'invoice id is required').not().isEmpty(),
  check('invoiceId').isMongoId(),
  check('invoiceId').custom(invoice_id),
  validate_fields,
], async (req, res) => {
  const {invoiceId} = req.params;
  const {status, ...rest} = await invoice.deleteById(invoiceId)
  return res.status(status).json(rest);
});

module.exports = router;