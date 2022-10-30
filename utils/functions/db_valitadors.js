const UserSchema = require('../../model/user');

const email_exits = async (email = '') => {
  const exits_email = await UserSchema.findOne({email});
  if(exits_email){
    throw new Error(`The email ${email} already exists`);
  };
};

const email_not_exits = async (email = '') => {
  const exits_email = await UserSchema.findOne({email});
  if(!exits_email){
    throw new Error(`The email ${email} does not exist`);
  };
};

const user_by_id = async (id = '') => {
  const user = await UserSchema.findById(id);
  if(!user){
    throw new Error(`The user ${id} does not exist`);
  };
};

const is_user_deleted = async (id = '') => {
  const {active} = await UserSchema.findById(id);
  if(!active){
    throw new Error(`The user ${id} was deleted`);
  };
};

const token_exits = async (token = '') => {
  const user = await UserSchema.findOne({token});
  if(!user || !user?.active){
    throw new Error(`Invalid token`);
  };
};

module.exports = {
  email_exits,
  email_not_exits,
  user_by_id,
  is_user_deleted,
  token_exits,
}