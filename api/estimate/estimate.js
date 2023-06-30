const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token} = require('../../middlewares/index');
const { estimate_by_id } = require('../../utils/functions/db_validations/estimate');
const { client_by_name_exits } = require('../../utils/functions/db_validations/client');
const Estimate = require('../../lib/estimate/estimate');
const estimate = new Estimate();

router.get('/', [ validate_token ], async(req, res) => {
  const {status, ...rest} = await estimate.get_all_estimates();
  return res.status(status).json(rest);
});

router.get('/:estimateId', [
  validate_token,
  check('estimateId', 'Invalid Id').isMongoId(),
  check('estimateId', 'Estimate id is required').not().isEmpty(),
  check('estimateId').custom(estimate_by_id),
  validate_fields
], async(req, res) => {
  const {estimateId} = req.params;
  const {status, ...rest} = await estimate.get_estimate_by_id(estimateId);
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('clientName', 'The client name is required').not().isEmpty(),
  check('clientName').custom(client_by_name_exits),
  validate_fields
], async(req, res) => {
  const { body } = req;
  const {status, ...rest} = await estimate.create(body);
  return res.status(status).json(rest);
});

router.put('/edit/:estimateId', [
  validate_token,
  check('estimateId', 'Estimate id is required').not().isEmpty(),
  check('estimateId', 'Invalid Id').isMongoId(),
  check('estimateId').custom(estimate_by_id),
  validate_fields
], async (req, res) => {
  const {body, params: {estimateId}} = req;
  const {status, ...rest} = await estimate.edit(body, estimateId);
  return res.status(status).json(rest);
});

router.delete('/delete/:estimateId', [
  validate_token,
  check('estimateId', 'Estimate id is required').not().isEmpty(),
  check('estimateId', 'Invalid Id').isMongoId(),
  check('estimateId').custom(estimate_by_id),
  validate_fields
], async (req, res) => {
  const {estimateId} = req.params;
  const {status, ...rest} = await estimate.delete(estimateId);
  return res.status(status).json(rest);
});

module.exports = router;