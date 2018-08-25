const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { Farm, validateFarm } = require('../models/Farm');
const { Cow, validateCow } = require('../models/Cow');
const _ = require('lodash');

router.post('/', auth, async (req, res) => {
  const { error } = validateFarm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let farm = new Farm({ name: req.body.name });
  farm.users.push(req.user._id);
  farm = await farm.save();

  res.send(_.pick(farm, ['_id', 'name']));
});

router.post('/:id/cattle', auth, validateObjectId, async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('User');
  
  if (!farm) return res.status(404).send('Farm not found.');

  if (farm.users.indexOf(req.user._id) === -1){
    return res.status(401).send('Unauthorized.');
  } 

  let cow = { ...req.body, farmId: String(farm._id) };

  const { error } = validateCow(cow);
  if (error) return res.status(400).send(error.details[0].message);

  cow = new Cow(cow);
  cow = await cow.save();
  res.send(cow);
});

module.exports = router;