const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token, has_role} = require('../../middlewares/index');
const {order_by_id, order_by_name} = require('../../utils/functions/db_validations/order');
const {client_by_id} = require('../../utils/functions/db_validations/client');
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

router.get('/client/:client_id', [
  validate_token,
  check('client_id', 'Invalid Id').isMongoId(),
  check('client_id').custom(client_by_id),
  validate_fields
], async(req, res) => {
  const {client_id} = req.params;
  const {status, ...rest} = await order.get_orders_by_client_id(client_id);
  return res.status(status).json(rest);
});

router.get('/client/:client_id/active', [
  validate_token,
  has_role(ADMIN_ROLE),
  check('client_id', 'Invalid Id').isMongoId(),
  check('client_id').custom(client_by_id),
  validate_fields,
], async(req, res) => {
  const {client_id} = req.params;
  const {status, ...rest} = await order.get_all_active_orders_by_client(client_id);
  return res.status(status).json(rest);
});

router.post('/create/:client_id', [
  validate_token,
  check('client_id', 'client_id is required').not().isEmpty(),
  check('client_id').custom(client_by_id),
  check('description', 'description is required').not().isEmpty(),
  check('service', 'service is required').not().isEmpty(),
  check('status', 'status is required').not().isEmpty(),
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