const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { Farm, validateFarm } = require('../models/Farm');
const { Cow, validateCow, CowGenders, validateCowParents } = require('../models/Cow');
const _ = require('lodash');

router.post('/', auth, async (req, res) => {
  const { error } = validateFarm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let farm = new Farm({ name: req.body.name });
  farm.users.push(req.user._id);
  farm = await farm.save();

  res.send(_.pick(farm, ['_id', 'name']));
});

router.get('/:id', auth, validateObjectId, async (req, res) => {
  let farm = await Farm.findById(req.params.id);
  if (!farm) return res.status(404).send('Farm not found.');

  farm = _.pick(farm, ['_id', 'name']);

  const cattle = await Cow.find({ farmId: farm._id });
  farm.cattle = cattle || [];

  res.send(farm);
});

router.delete('/:id', auth, validateObjectId, async (req, res) => {
  let farm = await Farm.findById(req.params.id).populate('User');
  if (!farm) return res.status(404).send('Farm not found.');

  if (farm.users.indexOf(req.user._id) === -1) {
    return res.status(401).send('Unauthorized.');
  }

  await Promise.all([
    Farm.deleteOne({ _id: farm._id }),
    Cow.deleteMany({ farmId: farm._id })
  ]);

  res.status(204).send();
});

router.post('/:id/cattle', auth, validateObjectId, async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('User');
  if (!farm) return res.status(404).send('Farm not found.');

  if (farm.users.indexOf(req.user._id) === -1) {
    return res.status(401).send('Unauthorized.');
  } 

  let cow = { ...req.body, farmId: String(farm._id) };

  let validateResult;
  validateResult = validateCow(cow);
  if (validateResult.error) return res.status(400).send(validateResult.error.details[0].message);
  
  validateResult = await validateCowParents(cow);
  if (validateResult.error) return res.status(400).send(validateResult.error.details[0].message);

  cow = new Cow(cow);
  cow = await cow.save();
  res.send(cow);
});

router.get('/:id/cattle/eligible-mothers', auth, validateObjectId, async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  if (!farm) return res.status(404).send('Farm not found.');

  const cattle = await Cow.find({
    gender: CowGenders.Cow,
    farmId: req.params.id
  });

  res.send(cattle);
});

router.get('/:id/cattle/eligible-fathers', auth, validateObjectId, async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  if (!farm) return res.status(404).send('Farm not found.');

  const cattle = await Cow.find({
    gender: CowGenders.Bull,
    farmId: req.params.id
  });

  res.send(cattle);
});

module.exports = router;