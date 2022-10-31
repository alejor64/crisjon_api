const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token, has_role} = require('../../middlewares/index');
const {
  client_by_id,
} = require('../../utils/functions/db_valitadors');
const {ADMIN_ROLE} = require('../../utils/constants/index');
const Client = require('../../lib/client/client');
const client = new Client();

router.get('/', [validate_token], async (req, res) => {
  const {status, ...rest} = await client.get_all_clients();
  return res.status(status).json(rest);
});

router.get('/:client_id', [
  validate_token,
  check('client_id', 'Client id is requires').not().isEmpty(),
  check('client_id').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {client_id} =req.params;
  const {status,...rest} = await client.get_client_by_id(client_id);
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('name').not().isEmpty(),
  check('address').not().isEmpty(),
  check('phone').not().isEmpty(),
  validate_fields,
], async (res, res) => {
  const {body} = req;
  const {status,...rest} = await client.create(body);
  return res.status(status).json(rest);
});

router.put('/edit/:client_id', [
  validate_token,
  has_role(ADMIN_ROLE),
  check('client_id', 'Client id is requires').not().isEmpty(),
  check('client_id').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {client_id} = req.param;
  const {body} = req;
  const {status, ...rest} = await client.edit(body, client_id);
  return res.status(status).json(rest);
});

module.exports = router;