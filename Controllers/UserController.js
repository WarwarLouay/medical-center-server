const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({ id }, 'jsonwebtokenJWTsecretKEY', {
        expiresIn: maxAge
    });
};

module.exports = {
    register: async function (req, res) {

        const data = req.body;
        const newData = new UserModel();

        newData.full_name = data.first_name + ' ' + data.last_name;
        newData.email = data.email;
        newData.city = data.city;
        newData.role = data.role;
        newData.phone = data.phone;
        newData.specialization = data.spec;
        newData.password = data.password;

        let count = await UserModel.countDocuments({ email: newData.email }).exec();
        if(count > 0){
            return res.status(200).json({ message: 'Email already exist' });
        }

        count = await UserModel.countDocuments({ phone: newData.phone }).exec();
        if(count > 0){
            return res.status(200).json({ message: 'Phone already exist' });
        }

        await newData.save();
        return res.status(201).json({ account: data });
    },

    login: async function (req, res) {
        try {
            const data = req.body;
            const email = data.email;
            const password = data.password;

            const user = await UserModel.login(email, password);
            return res.status(201).json({ user: user, login: true });
        } catch (err) {
            return res.status(200).json({ message: 'invalid' });
        }
    },

    getAllPatients: async function (req, res) {
        try {
            const patients = await UserModel.find({role: 'Patient'}).sort({ "$natural": -1 }).exec();
            return res.status(201).json({patients: patients});
        } catch (error) {
            console.log(error);
        }
    }
};