const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { serviceByName, serviceById } = require('../../../utils/functions/db_validations/services');
const {validate_token, validate_fields} = require('../../../middlewares/index');
const OrderService = require('../../../lib/order/service/service');
const orderService = new OrderService();

router.get('/', [
  validate_token,
], async(req, res) => {
  const {status, ...rest} = await orderService.get_all();
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('name').not().isEmpty(),
  check('name').custom(serviceByName),
  validate_fields,
], async(req, res) => {
  const {body} = req;
  const {status, ...rest} = await orderService.create(body);
  return res.status(status).json(rest); 
});

router.put('/edit/:orderServiceId', [
  validate_token,
  check('orderServiceId').isMongoId(),
  check('orderServiceId').custom(serviceById),
  validate_fields,
], async(req, res) => {
  const {body, params: {orderServiceId}} = req;
  const {status, ...rest} = await orderService.update(orderServiceId, body);
  return res.status(status).json(rest); 
});

router.delete('/delete/:orderServiceId', [
  validate_token,
  check('orderServiceId').isMongoId(),
  check('orderServiceId').custom(serviceById),
  validate_fields,
], async(req, res) => {
  const {orderServiceId} = req.params;
  const {status, ...rest} = await orderService.delete(orderServiceId);
  return res.status(status).json(rest); 
});

module.exports = router;