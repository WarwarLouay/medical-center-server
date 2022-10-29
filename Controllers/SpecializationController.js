const SpecializationModel = require('../Models/SpecializationModel');
const UserModel = require('../Models/UserModel');

module.exports = {
    addSpecialization: async function(req, res) {
        const data = req.body;
        const newData = new SpecializationModel();

        newData.name = data.name;
        count = await SpecializationModel.countDocuments({ name: newData.name }).exec();
        if(count > 0){
            return res.status(200).json({ message: newData.name + ' already added' });
        }

        await newData.save();
        return res.status(201).json({ specialization: data });
    },

    listSpecializations: async function (req, res) {
        const specialization = await SpecializationModel.find().sort({ "$natural": -1 }).exec();
        return res.status(201).json({specializations: specialization});
    },

    listDoctorBySpecializations: async function (req, res) {
        const doctors = await UserModel.find({specialization: req.params.id}).sort({ "$natural": -1 }).exec();
        return res.status(201).json({doctors: doctors});
    },

    searchSpecializations: async function (req, res) {
        try {
            let item = await SpecializationModel.find({
                '$or': [
                    {
                        name: { $regex: req.params.key }
                    }
                ]
            })
            return res.status(201).json({specializations: item});
        } catch (error) {
            console.log(error);
        }
    },
};