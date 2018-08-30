const express = require('express');
const router = express.Router();
const { Incident } = require('../models/Incident');

router.get('/', async (req, res) => {
  const incidents = await Incident.find({});
  res.send(incidents);
});

module.exports = router;