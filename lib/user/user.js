const UserSchema = require('../../model/user.js');
const {http_response} = require('../../config/http_responses/index');
const {generate_password, compare_password} = require('../../utils/functions/password');
const {generate_token} = require('../../utils/functions/token');

class User {
  constructor(){};

  async get_all_users(){
    try {
      const array_of_user = await UserSchema.find().lean(true);
      const users = array_of_user.map(({__v, token, password, ...rest}) => rest)
      return http_response(200, 'Users info', {users})
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async get_user_by_id(id){
    try {
      const user = await UserSchema.findById(id);
      return http_response(200, 'User info', {user});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async login({email, password}){
    try {
      const {password: hash, token, role} = await UserSchema.findOne({email});
      const can_login = compare_password(hash, password);
      if(!can_login){
        return http_response(400, `Invalid user or password`, {error: true});
      };
      return http_response(200, 'Success login', {token, role});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async singup({name, email, role, password}){
    try {
      const token = generate_token({name, email, role});
      const user_to_save = new UserSchema({ name, email, role, token });
      user_to_save.password = generate_password(password);
      const {token: token_created} = await user_to_save.save();
      return http_response(201, 'User created', {token: token_created});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async edit({password, role, name,  ...rest}, id){
    try {
      if(password){
        const {password: hash} = await UserSchema.findById(id);
        const can_udpate_password = compare_password(hash, password);
        if(!can_udpate_password){
          return http_response(400, `Invalid current password`, {updated: false});
        }
        rest.password = generate_password(rest.new_password);
      };
      if(role || name){
        const user = await UserSchema.findById(id);
        rest.token = generate_token({
          name: name ? name : user.name,
          email: user.email,
          role: role ? role : user.role,
        });
      };
      rest.active = true;
      rest.last_modificated_at = new Date();
      const user_updated = await UserSchema.findByIdAndUpdate(id, rest);
      const obj_response = {
        name: user_updated.name,
        email: user_updated.email,
        updated: true
      };
      return http_response(200, `User updated`, obj_response);
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };

  async delete(id){
    try {
      const user_deleted = await UserSchema.findByIdAndUpdate(id, {active: false, last_modificated_at: new Date()});
      return http_response(200, `User deleted`, {deleted: true, user_deleted});
    } catch (error) {
      return http_response(500, 'Internal server error', {error});
    }
  };
};

module.exports = User;