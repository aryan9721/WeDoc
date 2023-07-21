const globalConstant = require('../utils/globalConstant');
const errorMessages = require('../utils/errorMessages');
const userSchema = require('../models/user');

const decode_phonenum = function (req, res, next) {
    const {email} = req.body;
    userSchema.findOne({ $or: [{ email: email }, { contact: email }] })
    .then(user => {
        req.userId = user[globalConstant.UNDERSCORE_ID];
        next();
    })
    .catch(err => {
        return Promise.reject(errorMessages.MERCHANT_NOT_EXIST);  
    })
};

module.exports = decode_phonenum;