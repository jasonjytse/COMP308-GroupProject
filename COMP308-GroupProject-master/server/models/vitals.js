/**
 * @author: Jason Tse
 */
const  mongoose = require('mongoose');
const vitalType = mongoose.Schema({
    vitalId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    vitalType: {
        type: String,
        default: '',
        required: true,
        trim: true,
        // enum: {
        //     values: ['temperature', 'heart rate', 'blood pressure', 'respiratory rate'],
        //     message: '{VALUE} is not a valid vital type'
        // }
    },
    vitalEntry: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    vitalDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    vitalEnteredBy: {
        type: String,
    },
    patientRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    nurseRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nurse'
    }
});

module.exports = mongoose.model('Vital', vitalType);