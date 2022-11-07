const UserSchema = require('../../model/user');
const OrderSchema = require('../../model/order');

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

const cad_number_exits = async(cad_number) => {
  const order_with_cad_number = await OrderSchema.findOne({cad_number});
  if(order_with_cad_number){
    throw new Error(`The cad number ${cad_number} already exists`);
  };
};

module.exports = {
  email_exits,
  email_not_exits,
  user_by_id,
  is_user_deleted,
  cad_number_exits,
}