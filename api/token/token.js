const express = require('express');
const router = express.Router();
const Token = require('../../lib/token/token')
const token = new Token();

router.get('/review', async(req, res) => {
  const authorizatioTtoken = req.header('Authorization');
  const {status,...rest} = await token.validateToken(authorizatioTtoken);
  return res.status(status).json(rest); 
});

module.exports = router;