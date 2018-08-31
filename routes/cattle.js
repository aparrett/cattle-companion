const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { Cow } = require('../models/Cow');
const { Farm } = require('../models/Farm');

router.get('/:id', auth, validateObjectId, async (req, res) => {
  const cow = await Cow.findById(req.params.id);
  if (!cow) return res.status(404).send('Cow not found.');

  res.send(cow);
});

router.patch('/:id', auth, validateObjectId, async (req, res) => {
  const id = req.params.id;
  
  let cow = await Cow.findById(id);
  if (!cow) return res.status(404).send('Cow not found.');

  let farm = await Farm.findById(cow.farmId).populate('User');
  if (farm.users.indexOf(req.user._id) === -1){
    return res.status(401).send('Unauthorized.');
  } 

  cow = await Cow.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  res.send(cow);
});

module.exports = router;