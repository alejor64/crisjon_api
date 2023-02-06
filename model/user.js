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
  token:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastModificatedAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.methods.toJSON = function(){
  const {__v, password, _id, active, ...user} = this.toObject();
  return user;
};

module.exports = model('users', userSchema)