const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {token_key} = require('../config/index');
const {http_response} = require('../config/http_responses/index');

const validate_fields = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(errors)
  };
  next();
};

const validate_token = (req, res, next) => {
  const token = req.header('Authorization');
  if(!token){
    return res.status(401).json({msn: 'Unauthorized', error: true})
  };
  try {
    const user = jwt.verify(token, token_key);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({msn: 'Unauthorized', error: true})
  }
};

const admin_role = (req, res, next) => {
  const {user} = req;
  if(!user){
    return res.status(500).json({msn: 'Internal server error', error: true})
  };
  if(user.role !== 'Admin'){
    return res.status(401).json({msn: `${user.email} does not have permission`, error: true});
  };
  next();
};

module.exports = {
  validate_fields,
  validate_token,
  admin_role
}