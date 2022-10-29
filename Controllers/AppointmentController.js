const AppointmentModel = require('../Models/AppointmentModel');
const TakeAppointmentModel = require('../Models/TakeAppointmentModel');

module.exports = {
    takeAppointment: async function(req, res) {
        const data = req.body;
        const newData = new AppointmentModel();

        newData.patient = data.patient;
        newData.doctor = data.doctor;
        newData.date = data.date;
        newData.time = data.time;

        await newData.save();
        return res.status(201).json({ appointment: data });
    },

    addAppointment: async function(req, res) {
        const data = req.body;
        const newData = new AppointmentModel();

        newData.doctor = data.doctorId;
        newData.date = data.date;
        newData.time = data.time;

        let count1 = await AppointmentModel.countDocuments({ date: newData.date }).exec();
        let count2 = await AppointmentModel.countDocuments({ time: newData.time }).exec();
        if(count1 > 0 && count2 > 0){
            return res.status(200).json({ message: 'This Appointment already added' });
        }

        await newData.save();
        return res.status(201).json({ appointment: data });
    },

    listAppointments: async function(req, res) {
        try {
            const appointmens = await AppointmentModel.find({doctor: req.body.doctorId}).populate('doctor').sort({ "$natural": -1 }).exec();
            return res.status(201).json({appointments: appointmens});
        } catch (error) {
            console.log(error);
        }
    },

    deleteAppointments: async function(req, res) {
        try {
            const appointment = await AppointmentModel.deleteMany({_id: req.body.selectedRows});
            return res.status(201).json({message: 'deleted'});
        } catch (error) {
            console.log(error);
        }
    },

    getDate: async function(req, res) {
        try {
            const dates = await AppointmentModel.find({doctor: req.body.doctorId}).exec();
            return res.status(201).json({dates: dates});
        } catch (error) {
            console.log(error);
        }
    },

    getTime: async function(req, res) {
        try {
            const times = await AppointmentModel.find({doctor: req.body.doctorId, date: req.body.eDate, isValid: true}).exec();
            return res.status(201).json({times: times});
        } catch (error) {
            console.log(error);
        }
    },

    takeAppointment: async function(req, res) {
        try {
            const data = req.body;
            const newData = new TakeAppointmentModel();

            newData.patient = data.patientId;
            newData.doctor = data.doctorId;
            newData.date = data.selectedDate;
            newData.time = data.selectedTimeLabel;

            await newData.save();
            const valid = await AppointmentModel.findOneAndUpdate({doctor: req.body.doctorId, date: req.body.selectedDate, time: req.body.selectedTimeLabel}, {$set: {isValid: req.body.isValid}}, {upsert: true}).exec();

            return res.status(201).json({ takedAppointment: data });
        } catch (error) {
            console.log(error);
        }
    },

    getTakedAppointment: async function(req, res) {
        try {
            const appointmens = await TakeAppointmentModel.find({doctor: req.body.doctorId}).populate('patient').sort({ "$natural": -1 }).exec();
            return res.status(201).json({appointments: appointmens});
        } catch (error) {
            console.log(error);
        }
    }
};