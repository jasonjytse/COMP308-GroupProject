/*
 * @Author: Jason Tse
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        default: '',
        required: true,
        trim: true,

    },
    firstName: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    userType: {
        type:String,
        required: true,
        trim: true,
    }
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

module.exports = mongoose.model('User', nurseSchema);