const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token, has_role} = require('../../middlewares/index');
const {order_by_id, order_by_name} = require('../../utils/functions/db_validations/order');
const {client_by_name_exits} = require('../../utils/functions/db_validations/client');
const {ADMIN_ROLE, REGEX_DATE_BEGINING_YEAR} = require('../../utils/constants/index');
const Order = require('../../lib/order/order');
const order = new Order();

router.get('/', [
  validate_token,
], async(_req, res) => {
  const {status, ...rest} = await order.get_all_orders();
  return res.status(status).json(rest);
});

router.get('/active', [
  validate_token,
  has_role(ADMIN_ROLE),
], async(req, res) => {
  const {status, ...rest} = await order.get_all_active_orders();
  return res.status(status).json(rest);
});

router.get('/:orderId', [
  validate_token,
  check('orderId', 'Invalid Id').isMongoId(),
  check('orderId').custom(order_by_id),
  validate_fields
], async(req, res) => {
  const {orderId} = req.params;
  const {status, ...rest} = await order.get_order_by_id(orderId);
  return res.status(status).json(rest);
});

router.get('/client/:clientName', [
  validate_token,
  check('clientName').custom(client_by_name_exits),
  validate_fields
], async(req, res) => {
  const {clientName} = req.params;
  const {status, ...rest} = await order.get_orders_by_clientName(clientName);
  return res.status(status).json(rest);
});

router.get('/client/:clientName/active', [
  validate_token,
  check('clientName').custom(client_by_name_exits),
  validate_fields,
], async(req, res) => {
  const {clientName} = req.params;
  const {status, ...rest} = await order.get_all_active_orders_by_client(clientName);
  return res.status(status).json(rest);
});

router.get('/client-name/:clientName', [
  validate_token,
  check('clientName', 'Client name is required').not().isEmpty(),
  check('clientName').custom(client_by_name_exits),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('startDate', 'Invalid date').matches(REGEX_DATE_BEGINING_YEAR),
  check('endDate', 'End date is required').not().isEmpty(),
  check('endDate', 'Invalid date').matches(REGEX_DATE_BEGINING_YEAR),
  validate_fields,
], async(req, res) => {
  const {params: {clientName}, query: {startDate, endDate}} = req
  const {status, ...rest} = await order.get_orders_by_client_and_date(clientName, startDate, endDate);
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('clientName', 'clientName is required').not().isEmpty(),
  check('clientName').custom(client_by_name_exits),
  check('description', 'description is required').not().isEmpty(),
  check('service', 'service is required').not().isEmpty(),
  check('status', 'status is required').not().isEmpty(),
  check('item', 'item is required').not().isEmpty(),
  check('name', 'order name is required').not().isEmpty(),
  check('name').custom(order_by_name),
  validate_fields,
], async(req, res) => {
  const {body} = req;
  const {status, ...rest} = await order.create(body);
  return res.status(status).json(rest); 
});

router.put('/edit/:orderId', [
  validate_token,
  check('orderId', 'Invalid Id').isMongoId(),
  check('orderId').custom(order_by_id),
  validate_fields,
], async(req, res) => {
  const {body, params: {orderId}} = req;
  const {status, ...rest} = await order.edit(body, orderId);
  return res.status(status).json(rest); 
});

router.delete('/delete/:orderId', [
  validate_token,
  check('orderId', 'Invalid Id').isMongoId(),
  check('orderId').custom(order_by_id),
  validate_fields,
], async(req, res) => {
  const {orderId} = req.params;
  const {status, ...rest} = await order.delete(orderId);
  return res.status(status).json(rest); 
});

module.exports = router;