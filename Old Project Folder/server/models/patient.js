/**
 * @author: Jason Tse
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const patientSchema = new mongoose.Schema({
    patientId: {
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
    vitals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vitals'
    }]
});

patientSchema.pre('save', async function () {
    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

module.exports = mongoose.model('Patient', patientSchema);