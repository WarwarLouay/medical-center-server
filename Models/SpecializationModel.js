const mongoose = require('mongoose');

const specializationSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('specializations', specializationSchema);