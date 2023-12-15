/**
 * @author: Jason Tse
 */
const  mongoose = require('mongoose');
const vitalType = mongoose.Schema({
    vitalEntryId: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    vitalEntryType: {
        type: String,
        default: '',
        required: true,
        trim: true,
        // enum: {
        //     values: ['temperature', 'heart rate', 'blood pressure', 'respiratory rate'],
        //     message: '{VALUE} is not a valid vital type'
        // }
    },
    vitalDataEntry: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    vitalDataEntryDate: {
        type: Date,
        default: Date.now,
        required: true
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