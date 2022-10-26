const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: new Date(),
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  }
});

userSchema.methods.toJSON = function(){
  const {__v, password, ...user} = this.toObject();
  return user;
}

module.exports = model('users', userSchema)