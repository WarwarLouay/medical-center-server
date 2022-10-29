const RoomModel = require('../Models/RoomModel');

module.exports = {
    joinRoom: async function(req, res) {
        try {
            const data = req.body;

        let count1 = await RoomModel.countDocuments({ patient: data.patientId }).exec();
        let count2 = await RoomModel.countDocuments({ doctor: data.doctorId }).exec();

        if(count1 > 0 && count2 > 0) {
            let room = await RoomModel.find({patient: data.patientId, doctor: data.doctorId}).exec();
            return res.status(201).json(room);
        } else {
            const newData = new RoomModel();
            newData.patient = data.patientId;
            newData.doctor = data.doctorId;
            await newData.save();
            return res.status(201).json(newData);
        }
        } catch (error) {
            console.log(error);
        }
    }
};