const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token, has_role} = require('../../middlewares/index');
const {order_by_id, order_by_name} = require('../../utils/functions/db_validations/order');
const {client_by_id, client_by_name_exits} = require('../../utils/functions/db_validations/client');
const {ADMIN_ROLE} = require('../../utils/constants/index');
const Order = require('../../lib/order/order');
const order = new Order();

router.get('/', [
  validate_token,
], async(req, res) => {
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

router.get('/:order_id', [
  validate_token,
  check('order_id', 'Invalid Id').isMongoId(),
  check('order_id').custom(order_by_id),
  validate_fields
], async(req, res) => {
  const {order_id} = req.params;
  const {status, ...rest} = await order.get_order_by_id(order_id);
  return res.status(status).json(rest);
});

router.get('/client/:client_name', [
  validate_token,
  check('client_name').custom(client_by_name_exits),
  validate_fields
], async(req, res) => {
  const {client_name} = req.params;
  const {status, ...rest} = await order.get_orders_by_client_name(client_name);
  return res.status(status).json(rest);
});

router.get('/client/:client_name/active', [
  validate_token,
  check('client_name').custom(client_by_name_exits),
  validate_fields,
], async(req, res) => {
  const {client_name} = req.params;
  const {status, ...rest} = await order.get_all_active_orders_by_client(client_name);
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('client_name', 'client_name is required').not().isEmpty(),
  check('client_name').custom(client_by_name_exits),
  check('description', 'description is required').not().isEmpty(),
  check('service', 'service is required').not().isEmpty(),
  check('status', 'status is required').not().isEmpty(),
  check('item', 'item is required').not().isEmpty(),
  check('name', 'order name is required').not().isEmpty(),
  check('name').custom(order_by_name),
  validate_fields,
], async(req, res) => {
  const {body, params: {client_id}} = req;
  const {status, ...rest} = await order.create(body, client_id);
  return res.status(status).json(rest); 
});

router.put('/edit/:order_id', [
  validate_token,
  check('order_id', 'Invalid Id').isMongoId(),
  check('order_id').custom(order_by_id),
  validate_fields,
], async(req, res) => {
  const {body, params: {order_id}} = req;
  const {status, ...rest} = await order.edit(body, order_id);
  return res.status(status).json(rest); 
});

router.delete('/delete/:order_id', [
  validate_token,
  check('order_id', 'Invalid Id').isMongoId(),
  check('order_id').custom(order_by_id),
  validate_fields,
], async(req, res) => {
  const {order_id} = req.params;
  const {status, ...rest} = await order.delete(order_id);
  return res.status(status).json(rest); 
});

module.exports = router;