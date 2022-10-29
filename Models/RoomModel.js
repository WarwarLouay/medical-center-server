const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

module.exports = mongoose.model('rooms', roomSchema);