const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Farm, validate } = require('../models/Farm');
const _ = require('lodash');

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let farm = new Farm({ name: req.body.name });
  farm.users.push(req.user._id);
  farm = await farm.save();

  res.send(_.pick(farm, ['_id', 'name']));
});

module.exports = router;