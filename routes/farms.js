const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Farm, validate } = require('../models/Farm');
const { UserFarm } = require('../models/UserFarm');

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let farm = new Farm({ name: req.body.name });
  farm = await farm.save();

  let userFarm = new UserFarm({ user: req.user._id, farm: farm._id });
  userFarm = await userFarm.save();

  res.send(farm);
});

module.exports = router;