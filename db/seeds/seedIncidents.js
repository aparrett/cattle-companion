const { Incident } = require('../../models/Incident');

function seedIncidents() {
  const incidents = [
    { name: 'Assisted Delivery' },
    { name: 'Twins' },
    { name: 'Pinkeye' },
    { name: 'Lame: Joint/Structural' },
    { name: 'Lame: Foreign Object' },
    { name: 'Lame: Fescue Foot' },
    { name: 'Lost Calf: <1 month old' },
    { name: 'Lost Calf: >1 month old' },
    { name: 'Bloated' },
    { name: 'Prolapse: Vaginal' },
    { name: 'Prolapse: Uterine' },
    { name: 'Prolapse: Rectal' },
    { name: 'Abscess' }
  ];

  for (incident of incidents) {
    const newIncident = new Incident(incident);
    newIncident.save();
  }
}

module.exports = seedIncidents;