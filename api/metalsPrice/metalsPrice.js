const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { validate_token, validate_fields } = require('../../middlewares');
const MetalsPrice = require('../../lib/metalsPrice/metalsPrice');
const metalsPrice = new MetalsPrice();

router.get('/get-metals-price', async(req, res) => {
  const {status, ...rest} = await metalsPrice.getAllMetalsPrice();
  return res.status(status).json(rest);
});

router.get('/get-prices', [validate_token], async(req, res) => {
  const {status, ...rest} = await metalsPrice.getMetalsPrice();
  return res.status(status).json(rest);
})

router.post('/create', [
  validate_token,
  check('symbol').not().isEmpty(),
  check('name').not().isEmpty(),
  validate_fields,
], async(req, res) => {
  const { body } = req;
  const {status, ...rest} = await metalsPrice.createMetalPrice(body);
  return res.status(status).json(rest);
});

module.exports = router;