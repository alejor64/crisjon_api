const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token, has_role} = require('../../middlewares/index');
const { estimate_by_id } = require('../../utils/functions/db_validations/estimate');
const { client_by_id } = require('../../utils/functions/db_validations/client');
const { order_by_id } = require('../../utils/functions/db_validations/order');
const {ADMIN_ROLE} = require('../../utils/constants/index');
const Estimate = require('../../lib/estimate/estimate');
const estimate = new Estimate();

router.get('/', [ validate_token ], async(req, res) => {
  const {status, ...rest} = await estimate.get_all_estimates();
  return res.status(status).json(rest);
});

router.get('/:estimate_id', [
  validate_token,
  check('estimate_id', 'Invalid Id').isMongoId(),
  check('estimate_id', 'Estimate id is required').not().isEmpty(),
  check('estimate_id').custom(estimate_by_id),
  validate_fields
], async(req, res) => {
  const {estimate_id} = req.params;
  const {status, ...rest} = await estimate.get_estimate_by_id(estimate_id);
  return res.status(status).json(rest);
});

router.post('/create/client/:client_id/order/:order_id', [
  validate_token,
  check('client_id', 'The client id is required').not().isEmpty(),
  check('client_id', 'Invalid client id').isMongoId(),
  check('client_id').custom(client_by_id),
  check('order_id', 'The order id is required').not().isEmpty(),
  check('order_id', 'Invalid order id').isMongoId(),
  check('order_id').custom(order_by_id),
  validate_fields
], async(req, res) => {
  const {body, params: {client_id, order_id}} = req;
  const {status, ...rest} = await estimate.create(body, client_id, order_id);
  return res.status(status).json(rest);
});

router.put('/edit/:estimate_id', [
  validate_token,
  check('estimate_id', 'Estimate id is required').not().isEmpty(),
  check('estimate_id', 'Invalid Id').isMongoId(),
  check('estimate_id').custom(estimate_by_id),
  validate_fields
], async (req, res) => {
  const {body, params: {estimate_id}} = req;
  const {status, ...rest} = await estimate.edit(body, estimate_id);
  return res.status(status).json(rest);
});

router.delete('/delete/:estimate_id', [
  validate_token,
  check('estimate_id', 'Estimate id is required').not().isEmpty(),
  check('estimate_id', 'Invalid Id').isMongoId(),
  check('estimate_id').custom(estimate_by_id),
  validate_fields
], async (req, res) => {
  const {estimate_id} = req.params;
  const {status, ...rest} = await estimate.delete(estimate_id);
  return res.status(status).json(rest);
});

module.exports = router;