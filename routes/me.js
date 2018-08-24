const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { User } = require('../models/User');
const { Farm } = require('../models/Farm');

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/farms', auth, async (req, res) => {
  const farms = await Farm.find({ users: req.user._id });
  res.send(farms);
});

module.exports = router;