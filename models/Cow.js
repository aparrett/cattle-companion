const Joi = require('joi');
const mongoose = require('mongoose');

const CowGenders = Object.freeze({
  Cow: 'cow',
  Bull: 'bull'
});

const Cow = mongoose.model('Cow', new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true
  },
  gender: {
    type: String,
    enum: Object.values(CowGenders),
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cow' }],
  farmId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Farm',
    required: true
  }
}));

function validate(cow) {
  return Joi.validate(cow, {
    name: Joi.string().max(100).required(),
    gender: Joi.string().valid(Object.values(CowGenders)).required(),
    dateOfBirth: Joi.date().required(),
    parents: Joi.array().max(2),
    farmId: Joi.objectId().required()
  });
}

module.exports.Cow = Cow;
module.exports.validateCow = validate;
module.exports.CowGenders = CowGenders;
