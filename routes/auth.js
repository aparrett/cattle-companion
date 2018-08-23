const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');
    res.status(500).send('Error');
});

module.exports = router;