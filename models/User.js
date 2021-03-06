const config = require('../config');
const jwt = require ('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

function toLower(v) {
  return v.toLowerCase();
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    set: toLower
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.jwtPrivateKey);
  return token;
};

const User = mongoose.model('User', userSchema);

function validate(user) {
  const schema = {
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;