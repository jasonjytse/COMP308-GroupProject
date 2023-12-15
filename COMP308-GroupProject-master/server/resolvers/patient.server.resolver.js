/**
 * @author: Jason Tse
 */

const Patient = require('../models/patient.js');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = config.secretKey;
const JWT_EXPIRY = config.jwtExpirySeconds;

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
        const result = await Patient.findOne({ patientId: patientId });
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
        let oldPatient = await Patient.find({ patientId: patientId });
        if (!oldPatient) {
            return "Patient does not exist";
        }

        let newPatient = {...oldPatient, ...args };
        await Patient.findOneAndUpdate({ patientId: patientId }, newPatient, { new: true });
    } catch (err) {
        console.log(`updatePatient: err`);
    }
}

const deletePatient = async (args) => {
    let patientId = args.patientId;
    try {
        let Patient = await Patient.find({ patientId: patientId });
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
        await Patient.deleteMany({});
    } catch (err) {
        console.log(`deletePatients: err`);
    }
}
const patientLogin = async () => {
    try {
        await Patient.findOne({ patientId: patientId }, (err, patient) => {
            if (err) {
                console.log(err);
                return err;
            }
            if (!patient) {
                console.log(`Patient not found`);
                return `Patient not found`;
            }

            const validPassword = bcrypt.compare(args.password, patient.password);
            if (!validPassword) {
                console.log(`Incorrect password`);
                return `Incorrect password`;
            } else {
                const token = jwt.sign({_id: patient._id, patientId: patient.patientId}, JWT_SECRET, {algorithm: 'HS256', expiresIn: JWT_EXPIRY});
                context.res.cookie('token', token, { httpOnly: true, maxAge: JWT_EXPIRY });
                console.log(`Patient logged in`);
            }
        });
    } catch (err) {
        console.log(`patientLogin: err`);
    }
}
const patientLogout = async (parent, args, context) => {
    context.res.clearCookie('token');
    return "Logged out";
}

module.exports = {
    getPatient,
    getPatients,
    addPatient,
    updatePatient,
    deletePatient,
    deletePatients,
    patientLogin,
    patientLogout
}