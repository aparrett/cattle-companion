const mongoose = require('mongoose');

const Incident = mongoose.model('Incident', new mongoose.Schema({
  name: { type: String }
}));

module.exports.Incident = Incident;