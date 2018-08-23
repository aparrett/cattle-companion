const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Farm, validate } = require('../models/Farm');

router.post('/', auth, (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;