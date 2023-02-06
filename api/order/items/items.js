const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { itemByName, itemById } = require('../../../utils/functions/db_validations/items');
const {validate_token, validate_fields} = require('../../../middlewares/index');
const OrderItem = require('../../../lib/order/items/items');
const orderItem = new OrderItem();

router.get('/', [
  validate_token,
], async(req, res) => {
  const {status, ...rest} = await orderItem.get_all();
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('name').not().isEmpty(),
  check('name').custom(itemByName),
  validate_fields,
], async(req, res) => {
  const {body} = req;
  const {status, ...rest} = await orderItem.create(body);
  return res.status(status).json(rest); 
});

router.put('/edit/:orderItemId', [
  validate_token,
  check('orderItemId').isMongoId(),
  check('orderItemId').custom(itemById),
  validate_fields,
], async(req, res) => {
  const {body, params: {orderItemId}} = req;
  const {status, ...rest} = await orderItem.update(orderItemId, body);
  return res.status(status).json(rest); 
});

router.delete('/delete/:orderItemId', [
  validate_token,
  check('orderItemId').isMongoId(),
  check('orderItemId').custom(itemById),
  validate_fields,
], async(req, res) => {
  const {orderItemId} = req.params;
  const {status, ...rest} = await orderItem.delete(orderItemId);
  return res.status(status).json(rest); 
});

module.exports = router;