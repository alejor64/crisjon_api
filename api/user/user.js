const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields} = require('../../middlewares/index');
const {is_email_in_db} = require('../../utils/functions/db_valitadors');
const User = require('../../lib/user/user');
const user = new User();

router.get('/', async(req, res, next) => {

});

router.post('/login', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').not().isEmpty(),
    validate_fields
  ] ,async(req, res, next) => {

});

router.post('/singup', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({min: 9}),
    check('role', 'The role is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty(),
    validate_fields
  ] ,async(req, res, next) => {
  const {body} = req;
  const {status, ...rest} = await user.singup_user(body);
  return res.status(status).json(rest);
});

router.delete('/:email', [
  check('email').custom(is_email_in_db),
  validate_fields
  ], async() => {

});

module.exports = router;