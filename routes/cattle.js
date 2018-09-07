const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { Cow, CowGenders, validateCowUpdate, validateCowParents } = require('../models/Cow');
const { Farm } = require('../models/Farm');
const _ = require('lodash');

router.get('/:id', auth, validateObjectId, async (req, res) => {
  let cow = await Cow.findById(req.params.id)
    .populate('farm')
    .populate('mother')
    .populate('father');

  if (!cow) return res.status(404).send('Cow not found.');

  const children = await Cow.find({ $or: [{ mother: cow._id }, { father: cow._id }] })
    .populate('mother')
    .populate('father');

  cow = _.pick(cow, ['_id', 'name', 'gender', 'dateOfBirth', 'farm', 'incidents', 'mother', 'father']);
  cow.children = children;

  res.send(cow);
});

router.patch('/:id', auth, validateObjectId, async (req, res) => {
  const id = req.params.id;
  
  let cow = await Cow.findById(id);
  if (!cow) return res.status(404).send('Cow not found.');

  const farm = await Farm.findById(cow.farm).populate('User');
  if (farm.users.indexOf(req.user._id) === -1){
    return res.status(401).send('Unauthorized.');
  } 
  cow = await Cow.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  res.send(cow);
}); 

router.put('/:id', auth, validateObjectId, async (req, res) => {
  const id = req.params.id;
  
  let cow = await Cow.findById(id);
  if (!cow) return res.status(404).send('Cow not found.');

  const farm = await Farm.findById(cow.farm).populate('User');
  if (farm.users.indexOf(req.user._id) === -1){
    return res.status(401).send('Unauthorized.');
  } 

  const updateCow = _.pick(req.body, 
    ['name', 'gender', 'dateOfBirth', 'incidents', 'mother', 'father']
  );

  // farm is required for parent validation.
  updateCow.farm = String(farm._id);

  let validateResult;

  validateResult = validateCowUpdate(updateCow);
  if (validateResult.error) return res.status(400).send(validateResult.error.details[0].message);

  validateResult = await validateCowParents(updateCow);
  if (validateResult.error) return res.status(400).send(validateResult.error.details[0].message);

  cow = await Cow.findByIdAndUpdate(id, { $set: updateCow }, { new: true });
  res.send(cow);
}); 

router.delete('/:id', auth, validateObjectId, async (req, res) => {
  const cow = await Cow.findById(req.params.id);
  if (!cow) return res.status(404).send('Cow not found.');

  const farm = await Farm.findById(cow.farm).populate('User');
  if (farm.users.indexOf(req.user._id) === -1) {
    return res.status(401).send('Unauthorized.');
  }
  
  await cow.remove();

  if (cow.gender === CowGenders.Cow) {
    await Cow.update({ mother: cow._id }, { $unset: { mother: 1 } });
  } else {
    await Cow.update({ father: cow._id }, { $unset: { father: 1 } });
  }

  res.status(204).send();
});

router.get('/:id/eligible-mothers', auth, validateObjectId, async (req, res) => {
  const cow = await Cow.findById(req.params.id);
  if (!cow) return res.status(404).send('Cow not found.');

  const cattle = await Cow.find({
    dateOfBirth: { $lt: cow.dateOfBirth },
    gender: CowGenders.Cow,
    _id: { $ne: cow._id },
    farm: cow.farm
  });

  res.send(cattle);
});

router.get('/:id/eligible-fathers', auth, validateObjectId, async (req, res) => {
  const cow = await Cow.findById(req.params.id);
  if (!cow) return res.status(404).send('Cow not found.');

  const cattle = await Cow.find({
    dateOfBirth: { $lt: cow.dateOfBirth },
    gender: CowGenders.Bull,
    _id: { $ne: cow._id },
    farm: cow.farm
  });

  res.send(cattle);
});

module.exports = router;