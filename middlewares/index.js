const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {token_key} = require('../config/index');

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

const has_role = (...roles) => {
  return (req, res, next) => {
    const {role: user_role} = req.user;
    if(!user_role){
      return res.status(500).json({msn: 'Internal Server Error', error: true});
    }else if(!roles.includes(user_role)){
      return res.status(401).json({msn: 'Unauthorized', error: true})
    };
    next();
  };
};

module.exports = {
  validate_fields,
  validate_token,
  has_role
}