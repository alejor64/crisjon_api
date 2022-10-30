const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validate_fields} = require('../../middlewares/index');
const {
  email_exits,
  email_not_exits,
  user_by_id,
  is_user_deleted,
  token_exits,
  token_can_delete
} = require('../../utils/functions/db_valitadors');
const User = require('../../lib/user/user');
const user = new User();

router.get('/', [
    check('Authorization', 'Token is required').not().isEmpty(),
    check('Authorization').custom(token_exits),
    validate_fields
  ], async(req, res) => {
  const {status, ...rest} = await user.get_all_users();
  return res.status(status).json(rest);
});

router.get('/:user_id', [
    check('Authorization', 'Token is required').not().isEmpty(),
    check('user_id', 'Invalid Id').isMongoId(),
    check('user_id').custom(user_by_id),
    check('Authorization').custom(token_exits),
    validate_fields
  ], async(req, res, next) => {
  const {user_id} = req.params;
  const {status, ...rest} = await user.get_user_by_id(user_id);
  return res.status(status).json(rest);
});

router.post('/login', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').not().isEmpty(),
    check('email').custom(email_not_exits),
    validate_fields
  ] ,async(req, res) => {
    const {body} = req;
  const {status, ...rest} = await user.login(body);
  return res.status(status).json(rest);
});

router.post('/singup', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({min: 9}),
    check('role', 'The role is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty(),
    check('email').custom(email_exits),
    validate_fields
  ], async(req, res) => {
  const {body} = req;
  const {status, ...rest} = await user.singup(body);
  return res.status(status).json(rest);
});

router.put('/edit/:user_id', [
    check('email', 'The email can not be updated').isEmpty(),
    check('id', 'The id can not be updated').isEmpty(),
    check('_id', 'The id can not be updated').isEmpty(),
    check('Authorization', 'Token is required').not().isEmpty(),
    check('user_id', 'Invalid Id').isMongoId(),
    check('user_id').custom(user_by_id),
    check('Authorization').custom(token_exits),
    validate_fields
  ], async (req, res) => {
  const {user_id} = req.params;
  const {body} = req;
  const {status, ...rest} = await user.edit(body, user_id);
  return res.status(status).json(rest);
});

router.delete('/delete/:user_id', [
    check('Authorization', 'Token is required').not().isEmpty(),
    check('user_id', 'Invalid Id').isMongoId(),
    check('user_id').custom(user_by_id),
    check('user_id').custom(is_user_deleted),
    check('Authorization').custom(token_exits),
    check('Authorization').custom(token_can_delete),
    validate_fields
  ], async (req, res) => {
  const {user_id} = req.params;
  const {status, ...rest} = await user.delete(user_id);
  return res.status(status).json(rest);
});

module.exports = router;