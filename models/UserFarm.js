const mongoose = require('mongoose');

const userFarmSchema = new mongoose.Schema({
    farm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const UserFarm = mongoose.model('UserFarm', userFarmSchema);

module.exports.UserFarm = UserFarm;