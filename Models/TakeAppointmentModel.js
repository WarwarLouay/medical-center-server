const mongoose = require('mongoose');

const takeAppointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('takeAppointment', takeAppointmentSchema);