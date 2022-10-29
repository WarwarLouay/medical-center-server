const MessageModel = require('../Models/MessageModel');

module.exports = {
    sendMessage: async function(req, res) {
        try {
            const data = req.body;

            const newData = new MessageModel();
            newData.room = data.room;
            newData.author = data.author;
            newData.message = data.message;
            newData.time = data.time;

            await newData.save();
            return res.status(201).json(newData);
        } catch (error) {
            console.log(error);
        }
    },

    listmessages: async function(req, res) {
        try {
            const messages = await MessageModel.find({room: req.body.room}).exec();
            return res.status(201).json({messages: messages});
        } catch (error) {
            console.log(error);
        }
    }
};