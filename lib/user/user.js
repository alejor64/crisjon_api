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
      return http_response(500, 'Internal server error in user', {error});
    }
  };

  async get_user_by_id(id){
    try {
      const user = await UserSchema.findById(id);
      return http_response(200, 'User info', {user});
    } catch (error) {
      return http_response(500, 'Internal server error in user', {error});
    }
  };

  async login({email, password}){
    try {
      const {password: hash, __v, ...rest} = await UserSchema.findOne({email}).lean(true);
      const can_login = compare_password(hash, password);
      if(!can_login){
        return http_response(400, `Invalid user or password`, {error: true});
      };
      return http_response(200, 'Success login', {user: rest});
    } catch (error) {
      return http_response(500, 'Internal server error in user', {error});
    }
  };

  async singup({name, email, role, password}){
    try {
      const token = generate_token({name, email, role});
      const user_to_save = new UserSchema({ name, email, role, token });
      user_to_save.password = generate_password(password);
      const userCreated = await user_to_save.save();
      const user = {
        name: userCreated.name,
        active: userCreated.active,
        createdAt: userCreated.createdAt,
        email: userCreated.email,
        lastModificatedAt: userCreated.lastModificatedAt,
        role: userCreated.role,
        _id: userCreated._id
      }
      return http_response(201, `The user ${user.name} was created successfully`, {user});
    } catch (error) {
      return http_response(500, 'Internal server error in user', {error});
    }
  };

  async edit({password, role, name,  ...rest}, id){
    try {
      if(password){
        const {password: hash} = await UserSchema.findById(id);
        const can_udpate_password = compare_password(hash, password);
        if(!can_udpate_password){
          return http_response(400, `Invalid current password`, {error: true});
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
        rest.role = role ? role : user.role;
        rest.name = name ? name : user.name;
      };
      rest.active = true;
      rest.lastModificatedAt = new Date();
      const user_updated = await UserSchema.findByIdAndUpdate(id, rest, {new: true}).lean(true);
      const obj_response = {
        email: user_updated.email,
        updated: true
      };
      return http_response(200, `User updated`, {user: obj_response});
    } catch (error) {
      return http_response(500, 'Internal server error in user', {error});
    }
  };

  async delete(id){
    try {
      const user_deleted = await UserSchema.findByIdAndUpdate(
        id,
        {active: false, lastModificatedAt: new Date()},
        {new: true}
      ).lean(true);
      return http_response(200, `User deleted`, {user: user_deleted});
    } catch (error) {
      return http_response(500, 'Internal server error in user', {error});
    }
  };
};

module.exports = User;