/**
 * @author: Jason Tse
 */

const Vitals = require('../models/vitals.js');
const Patient = require('../models/patient.js');
const Nurse = require('../models/nurse.js');

const getPatientVitals = async (args) => {
    let patientId = args.patientId;
    return await Vitals.find({ patientId: patientId });
}

const getPatientVitalsEnteredByPatient = async (args) => {
    let patientId = args.patientId;
    patiendMongoId = await Patient.findOne({ patientId: patientId });
    return await Vitals.find({ patientId: patientId, vitalDataEnteredBy: "patient" });
}

const getPatientVitalsEnteredByNurse  = async (args) => {
    let patientId = args.patientId;
    let nurseId = args.nurseId;

    let nurseMongoId = await Nurse.findOne({ nurseId: nurseId });
    return await Vitals.find({ patientId: patientId, nurseRef: nurseMongoId._id });
}

const createVitals = async (args) => {
    let vitals = args.vitals;
    let patientVitals = new Vitals({vitals});

    if (vitals.vitalDataEnteredBy == "patient") {
        let patient = await Patient.findOne({ patientId: vitals.patientId });
        patientVitals.patientRef = patient._id;
    } else {
        let nurse = await Nurse.findOne({ nurseId: vitals.nurseId });
        patientVitals.nurseRef = nurse._id;
    }
    return patientVitals.save();
}

const updateVitals = async (args) => {
    let vitals = args.vitals;

    let oldVitals = Vitals.find({ patientId: vitals.patientId, date: vitals.date });
    if (!oldVitals) {
        return "Vitals do not exist";
    }

    let newVitals = {...oldVitals, ...args };
    Vitals.findOneAndUpdate({ patientId: vitals.patientId, date: vitals.date }, newVitals, { new: true });
}

const deleteVitals = async (args) => {
    let patientId = args.patientId;
    await Vitals.deleteMany({ patientId: patientId });
}

const deleteOneVital = async (args) => {
    let vitalId = args.vitalId;
    await Vitals.deleteOne({ vitalId: vitalId });
}

module.exports = {
    getPatientVitals,
    getPatientVitalsEnteredByPatient,
    getPatientVitalsEnteredByNurse,
    createVitals,
    updateVitals,
    deleteVitals,
    deleteOneVital
}