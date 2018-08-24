import mongoose from 'mongoose';
import Joi from 'joi';

const CowGenders = Object.freeze({
  Cow: 'cow',
  Bull: 'bull'
});

const Cow = new mongoose.model('Cow', new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true
  },
  gender: {
    type: String,
    enum: Object.values(CowGenders),
    required: true
  },
  birthday: {
    type: Date,
    required: true
  }
}));

function validate(cow) {
  return Joi.validate(cow, {
    name: Joi.string().min(2).max(100).required(),
    gender: Joi.string().valid(Object.values(CowGenders)).required(),
    birthday: Joi.date().required()
  });
}

module.exports.Cow = Cow;
module.exports.validate = validate;
module.exports.CowGenders = CowGenders;
