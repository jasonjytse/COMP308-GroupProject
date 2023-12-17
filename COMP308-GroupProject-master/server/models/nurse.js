/**
 * Author: Jason Tse
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const nurseSchema = new mongoose.Schema({
    nurseId: {
        type: String,
        unique: true,
        trim: true

    },
    password: {
        type: String,
        default: '',
        trim: true,

    },
    firstName: {
        type: String,
        default: '',
        trim: true,
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
    }
});

nurseSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

module.exports = mongoose.model('Nurse', nurseSchema);