const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields, validate_token} = require('../../middlewares/index');
const ClientBook = require('../../lib/clientBook/clientBook');
const { client_by_id, client_by_name } = require('../../utils/functions/db_validations/clientBook');
const clientBook = new ClientBook();

router.get('/', [validate_token], async (req, res) => {
  const {status, ...rest} = await clientBook.get_all_clients();
  return res.status(status).json(rest);
});

router.get('/:clientBookId', [
  validate_token,
  check('clientBookId', 'Client book id is required').not().isEmpty(),
  check('clientBookId').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {clientBookId} =req.params;
  const {status,...rest} = await clientBook.get_client_by_id(clientBookId);
  return res.status(status).json(rest);
});

router.post('/create', [
  validate_token,
  check('name').not().isEmpty(),
  check('name').custom(client_by_name),
  validate_fields,
], async (req, res) => {
  const {body} = req;
  const {status,...rest} = await clientBook.create(body);
  return res.status(status).json(rest);
});

router.put('/edit/:clientBookId', [
  validate_token,
  check('clientBookId', 'Client book id is required').not().isEmpty(),
  check('clientBookId').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {clientBookId} = req.params;
  const {body} = req;
  const {status, ...rest} = await clientBook.edit(body, clientBookId);
  return res.status(status).json(rest);
});

router.delete('/delete/:clientBookId', [
  validate_token,
  check('clientBookId', 'Client book id is required').not().isEmpty(),
  check('clientBookId').custom(client_by_id),
  validate_fields,
], async (req, res) => {
  const {clientBookId} = req.params;
  const {status, ...rest} = await clientBook.deleteById(clientBookId);
  return res.status(status).json(rest);
});

module.exports = router;