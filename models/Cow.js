const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const CowGenders = Object.freeze({
  Cow: 'Cow',
  Bull: 'Bull'
});

function dateFromDateTime(dt) {
  return moment(dt).format('MM/DD/YYYY');
}

const cowSchema = new mongoose.Schema({
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
    required: true,
    get: dateFromDateTime
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
});

cowSchema.set('toObject', { getters: true });
cowSchema.set('toJSON', { getters: true });

const Cow = mongoose.model('Cow', cowSchema);

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

function validateUpdate(cow) {
  return Joi.validate(cow, {
    name: Joi.string().max(100),
    gender: Joi.string().valid(Object.values(CowGenders)),
    dateOfBirth: Joi.date(),
    mother: Joi.objectId(),
    father: Joi.objectId(),
    farmId: Joi.objectId(),
    incidents: Joi.array().items(incident)
  });
}

// Custom validation that returns error in same format as Joi.
async function validateParents(cow) {
  if (cow.mother) {
    const eligibleMothers = await Cow.find({
      dateOfBirth: { $lt: cow.dateOfBirth },
      gender: CowGenders.Cow,
      _id: { $ne: cow._id },
      farmId: cow.farmId
    });

    if (!eligibleMothers.find(mother => String(mother._id) === cow.mother)) {
      return {
        error: {
          details: [{ message: 'Selected mother must belong to this farm and be older than this cow.' }]
        }
      }
    }
  }

  if (cow.father) {
    const eligibleFathers = await Cow.find({
      dateOfBirth: { $lt: cow.dateOfBirth },
      gender: CowGenders.Bull,
      _id: { $ne: cow._id },
      farmId: cow.farmId
    });

    if (!eligibleFathers.find(father => String(father._id) === cow.father)) {
      return {
        error: {
          details: [{ message: 'Selected father must belong to this farm and be older than this cow.' }]
        }
      }
    }
  }

  return {};
}

module.exports.Cow = Cow;
module.exports.validateCow = validate;
module.exports.validateCowUpdate = validateUpdate;
module.exports.validateCowParents = validateParents;
module.exports.CowGenders = CowGenders;

