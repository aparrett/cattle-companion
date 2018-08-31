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
  mother: { type: mongoose.Schema.Types.ObjectId, ref: 'Cow' },
  father: { type: mongoose.Schema.Types.ObjectId, ref: 'Cow' },
  farmId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Farm',
    required: true
  },
  incidents: [{ 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        maxlength: 255
      },
      date: {
        type: Date
      }
    }) 
  }]
}));

function validate(cow) {
  const incident = Joi.object().keys({
    name: Joi.string().max(255).required(),
    date: Joi.date()
  });
  
  return Joi.validate(cow, {
    name: Joi.string().max(100).required(),
    gender: Joi.string().valid(Object.values(CowGenders)).required(),
    dateOfBirth: Joi.date().required(),
    mother: Joi.objectId(),
    father: Joi.objectId(),
    farmId: Joi.objectId().required(),
    incidents: Joi.array().items(incident)
  });
}

module.exports.Cow = Cow;
module.exports.validateCow = validate;
module.exports.CowGenders = CowGenders;
