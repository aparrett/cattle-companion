const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { User } = require('../models/User');

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/farms', auth, validateObjectId, async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  if (!user) res.status(404).send('User not found.');

  res.status(500).send('test');
});

module.exports = router;