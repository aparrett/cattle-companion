const Joi = require('joi');
const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  }
});

const Farm = mongoose.model('Farm', farmSchema);

function validate(farm) {
  return Joi.validate(farm, {
    name: Joi.string().max(100).required()
  });
}

exports.Farm = Farm;
exports.validate = validate;