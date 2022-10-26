const UserSchema = require('../../model/user');

const is_email_in_db = async (email = '') => {
  const exits_email = await UserSchema.findOne({email});
  if(!exits_email){
    throw new Error(`The email ${email} is not registered`);
  }
};

module.exports = {
  is_email_in_db
}