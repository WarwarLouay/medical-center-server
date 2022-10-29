const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

module.exports = {
    checkUser: (req, res, next) => {
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, 'jsonwebtokenJWTsecretKEY', async (err, decodedToken) => {
                if(err){
                    res.json({ status: false });
                } else {
                    const user = await UserModel.findById(decodedToken.id);
                    if(user){
                        res.json({ status: true, user: user._id });
                    } else {
                        res.json({ status: false });
                        next();
                    }
                }
            })
        } else {
            res.json({ status: false });
            next();
        }
    }
};