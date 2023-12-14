/**
 * @author: Jason Tse
 */

const Vitals = require('../models/vitals.server.model');

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
    let vitals = args.vitals;

    let newVitals = new Vitals({
        patientId: vitals.patientId,
        vitalDataEnteredBy: vitals.vitalDataEnteredBy,
        vitalData: vitals.vitalData,
        date: vitals.date
    });

    return vitals.save();
}

const updateVitals = async (args) => {

}

const deleteVitals = async (args) => {
    let patientId = args.patientId;


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