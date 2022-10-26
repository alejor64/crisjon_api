const bcryptjs = require('bcryptjs');
const UserSchema = require('../../model/user.js');

class User {
  constructor(){};

  async singup_user({name, email, role, password}){
    const exists_email = await UserSchema.findOne({email});
    if(exists_email){
      return {
        status: 400,
        msg: `The email ${email} already exists`,
        success: false
      }
    };
    const user_to_save = new UserSchema({ name, email, role, password });
    const salt = bcryptjs.genSaltSync(10);
    user_to_save.password = bcryptjs.hashSync(password, salt);
    const user_saved = await user_to_save.save();
    return {
      status: 200,
      msg: 'User created',
      user_saved: user_saved
    }
  };
};

module.exports = User;