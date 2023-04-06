const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token} = require('../../middlewares/index');
const {client_by_id, client_by_name} = require('../../utils/functions/db_validations/client');
const Client = require('../../lib/client/client');
const client = new Client();

router.get('/', [validate_token], async (req, res) => {
  const {status, ...rest} = await client.get_all_clients();
  return res.status(status).json(rest);
});

router.get('/:clientId', [
  validate_token,
  check('clientId', 'Client id is required').not().isEmpty(),
  check('clientId').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {clientId} =req.params;
  const {status,...rest} = await client.get_client_by_id(clientId);
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('name').not().isEmpty(),
  check('name').custom(client_by_name),
  check('address').not().isEmpty(),
  check('phone').not().isEmpty(),
  check('fein').not().isEmpty(),
  validate_fields,
], async (req, res) => {
  const {body} = req;
  const {status,...rest} = await client.create(body);
  return res.status(status).json(rest);
});

router.put('/edit/:clientId', [
  validate_token,
  check('clientId', 'Client id is required').not().isEmpty(),
  check('clientId').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {clientId} = req.params;
  const {body} = req;
  const {status, ...rest} = await client.edit(body, clientId);
  return res.status(status).json(rest);
});

router.delete('/delete/:clientId', [
  validate_token,
  check('clientId', 'Client id is required').not().isEmpty(),
  check('clientId').isMongoId(),
  check('clientId').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {clientId} = req.params;
  const {status, ...rest} = await client.deleteById(clientId);
  return res.status(status).json(rest);
})

module.exports = router;