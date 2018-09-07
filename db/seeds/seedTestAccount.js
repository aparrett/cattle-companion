const seedIncidents = require('./seedIncidents');
const { User } = require('../../models/User');
const { Farm } = require('../../models/Farm');
const { Cow, CowGenders } = require('../../models/Cow');
const bcrypt = require('bcrypt');

async function seedTestAccount() {
  await seedIncidents();
  await deleteTestAccount();

  let guest = new User({ name: 'Guest', email: 'test@test.com', password: 'password' });
  const salt = await bcrypt.genSalt(10);
  guest.password = await bcrypt.hash(guest.password, salt);
  guest = await guest.save();

  let greece = new Farm({ name: 'Greece', users: [guest] });
  let westeros = new Farm({ name: 'westeros', users: [guest] });
  
  [greece, westeros]  = await Promise.all([ greece.save(), westeros.save() ]);

  await Promise.all([ seedGreece(greece._id), seedWesteros(westeros._id) ]);
}

async function seedGreece(farmId) {
  let cronus = new Cow({ 
    name: 'Cronus', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2016'), 
    farm: farmId,
    incidents: [{ name: 'Lame: Fescue Foot', date: new Date('01/02/2016') }]
  });

  let rhea = new Cow({ 
    name: 'Rhea', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2016'), 
    farm: farmId,
    incidents: [{ name: 'Lost Calf: <1 month old', date: new Date('06/02/2016') }]
  });

  [cronus, rhea] = await Promise.all([ cronus.save(), rhea.save() ]);

  let leto = new Cow({ 
    name: 'Leto', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2016'), 
    farm: farmId,
    incidents: [{ name: 'Twins', date: new Date('01/01/2018') }]
  });

  let zeus = new Cow({ 
    name: 'Zeus', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Bloated', date: new Date('01/02/2017') }],
    mother: rhea._id,
    father: cronus._id
  });

  let hera = new Cow({ 
    name: 'Hera', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Assisted Delivery', date: new Date('06/02/2017') }],
    mother: rhea._id,
    father: cronus._id
  });

  let hades = new Cow({ 
    name: 'Hades', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Bloated', date: new Date('01/02/2017') }],
    mother: rhea._id,
    father: cronus._id
  });

  [leto, zeus, hera, hades] = await Promise.all([ leto.save(), zeus.save(), hera.save(), hades.save() ]);

  const ares = new Cow({ 
    name: 'Ares', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2018'), 
    farm: farmId,
    incidents: [{ name: 'Lame: Fescue Foot', date: new Date('01/02/2018') }],
    mother: hera._id,
    father: zeus._id
  });

  const aphrodite = new Cow({ 
    name: 'Aphrodite', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2018'), 
    farm: farmId,
    incidents: [{ name: 'Lame: Foreign Object', date: new Date('06/02/2018') }],
    mother: hera._id,
    father: zeus._id
  });

  const apollo = new Cow({ 
    name: 'Apollo', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2018'), 
    farm: farmId,
    incidents: [{ name: 'Bloated', date: new Date('01/02/2018') }],
    mother: leto._id,
    father: zeus._id
  });

  const artemis = new Cow({ 
    name: 'Artemis', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2018'), 
    farm: farmId,
    incidents: [{ name: 'Abscess', date: new Date('01/02/2018') }],
    mother: leto._id,
    father: zeus._id
  });

  await Promise.all([ ares.save(), aphrodite.save(), apollo.save(), artemis.save() ]);
}

async function seedWesteros(farmId) {
  let eddard = new Cow({ 
    name: 'Eddard', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2016'), 
    farm: farmId,
    incidents: [{ name: 'Lame: Fescue Foot', date: new Date('01/02/2016') }]
  });

  let catelyn = new Cow({ 
    name: 'Catelyn', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2016'), 
    farm: farmId,
    incidents: [
      { name: 'Lame: Joint/Structural', date: new Date('06/02/2016') },
      { name: 'Lame: Foreign Object', date: new Date('06/02/2017') }
    ]
  });

  let robert = new Cow({ 
    name: 'Robert', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2016'), 
    farm: farmId,
    incidents: [{ name: 'Bloated', date: new Date('01/02/2016') }]
  });

  let cersei = new Cow({ 
    name: 'Cersei', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2016'), 
    farm: farmId,
    incidents: [{ name: 'Assisted Delivery', date: new Date('06/02/2016') }]
  });

  [eddard, catelyn, robert, cersei] = await Promise.all([ eddard.save(), catelyn.save(), robert.save(), cersei.save() ]);

  const robb = new Cow({ 
    name: 'Robb', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Lame: Foreign Object', date: new Date('06/02/2017') }],
    mother: catelyn._id,
    father: eddard._id
  });

  const arya = new Cow({ 
    name: 'Arya', 
    gender: CowGenders.Cow, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    mother: catelyn._id,
    father: eddard._id
  });

  const brandon = new Cow({ 
    name: 'Brandon', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Pinkeye', date: new Date('06/02/2017') }],
    mother: catelyn._id,
    father: eddard._id
  });

  const rickon = new Cow({ 
    name: 'Rickon', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    mother: catelyn._id,
    father: eddard._id
  });

  const jon = new Cow({ 
    name: 'Jon', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Abscess', date: new Date('06/02/2017') }],
    father: eddard._id
  });

  const renly = new Cow({ 
    name: 'Renly', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Lame: Foreign Object', date: new Date('06/02/2017') }],
    mother: cersei._id,
    father: robert._id
  });

  const stanis = new Cow({ 
    name: 'Stanis', 
    gender: CowGenders.Bull, 
    dateOfBirth: new Date('01/01/2017'), 
    farm: farmId,
    incidents: [{ name: 'Lame: Foreign Object', date: new Date('06/02/2017') }],
    mother: cersei._id,
    father: robert._id
  });

  await Promise.all([ robb.save(), arya.save(), brandon.save(), rickon.save(), jon.save(), renly.save(), stanis.save() ]);
}

async function deleteTestAccount() {
  const user = await User.findOne({ email: 'test@test.com' });
  
  if (!user) return;
  
  const farms = await Farm.find({ users: user._id });
  const farmIds = farms.map(farm => farm._id);
  
  const cows = await Cow.find({ farm: { $in: farmIds } });
  const cowIds = cows.map(cow => cow._id);

  await Promise.all([
    User.findByIdAndDelete(user._id),
    Farm.deleteMany({ _id: { $in: farmIds } }),
    Cow.deleteMany({ _id: { $in: cowIds } })
  ]);
}

module.exports = seedTestAccount;