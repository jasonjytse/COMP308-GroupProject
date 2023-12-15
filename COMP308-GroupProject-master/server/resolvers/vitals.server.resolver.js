/**
 * @author: Jason Tse
 */

const Vitals = require('../models/vitals.js');

const getPatientVitals = async (args) => {
    let patientId = args.patientId;
    return await Vitals.find({ patientId: patientId });
}

const getPatientVitalsEnteredByPatient = async (args) => {
    let patientId = args.patientId;
    return await Vitals.find({ patientId: patientId, vitalDataEnteredBy: "patient" });
}

const getPatientVitalsEnteredByNurse  = async (args) => {
    let patientId = args.patientId;
    return await Vitals.find({ patientId: patientId, vitalDataEnteredBy: "nurse" });
}

const createVitals = async (args) => {
    let vitals = args

    return vitals.save();
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
    let date = args.date;

    await Vitals.deleteMany({ patientId: patientId, date: date });
}

const deleteOneVital = async (args) => {

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