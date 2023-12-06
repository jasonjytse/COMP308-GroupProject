/**
 * Author: Jason Tse
 */

const Patient = require('../models/patient.server.model');

const getPatient = async (args) => {
    let patientId = args.patientId;
    return await Patient.findOne({ patientId: patientId });
}

const getPatients = async() => {
    return await Patient.find({});
}

const addPatient = async (args) => {
    try {
        let patientId = args.patientId;
        const result = Patient.findOne({ patientId: patientId });
        if (result) {
            return "Patient already exists";
        }

        const Patient = new Patient(args);
        await Patient.save();
        return Patient;
    } catch (err) {
        console.log(`addPatient: err`);
        return err;
    }
}

const updatePatient = async (args) => {
    let patientId = args.patientId;
    try {
        let oldPatient = Patient.find({ patientId: patientId });
        if (!oldPatient) {
            return "Patient does not exist";
        }

        let newPatient = {...oldPatient, ...args };
        Patient.findOneAndUpdate({ patientId: patientId }, newPatient, { new: true });
    } catch (err) {
        console.log(`updatePatient: err`);
    }
}

const deletePatient = async (args) => {
    let patientId = args.patientId;
    try {
        let Patient = Patient.find({ patientId: patientId });
        if (!Patient) {
            return "Patient does not exist";
        }

        Patient.findOneAndDelete({ patientId: patientId });
    } catch (err) {
        console.log(`deletePatient: err`);
    }
}

const deletePatients = async () => {
    try {
        Patient.deleteMany({});
    } catch (err) {
        console.log(`deletePatients: err`);
    }
}


module.exports = {
    getPatient,
    getPatients,
    addPatient,
    updatePatient,
    deletePatient,
    deletePatients
}