const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
    },
    author: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('messages', roomSchema);