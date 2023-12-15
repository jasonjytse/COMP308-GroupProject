/**
 *
 * @author: Jason Tse
 */

const Nurse = require('../models/nurse');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = config.secretKey;
const JWT_EXPIRY = config.jwtExpirySeconds;

const getNurse = async (args) => {
    let nurseId = args.nurseId;
    return await Nurse.findOne({ nurseId: nurseId });
}

const getNurses = async() => {
    return await Nurse.find({});
}

const addNurse = async (args) => {
    try {
        let nurseId = args.nurseId;
        const result = await Nurse.findOne({ nurseId: nurseId });
        if (result) {
            return "Nurse already exists";
        }

        const nurse = new Nurse(args);
        await nurse.save();
        return nurse;
    } catch (err) {
        console.log(`addNurse: err`);
        return err;
    }
}

const updateNurse = async (args) => {
    let nurseId = args.nurseId;
    try {
        let oldNurse = await Nurse.find({ nurseId: nurseId });
        if (!oldNurse) {
            return "Nurse does not exist";
        }

        let newNurse = {...oldNurse, ...args };
        Nurse.findOneAndUpdate({ nurseId: nurseId }, newNurse, { new: true });
    } catch (err) {
        console.log(`updateNurse: err`);
    }
}

const deleteNurse = async (args) => {
    let nurseId = args.nurseId;
    try {
        let nurse = await urse.find({ nurseId: nurseId });
        if (!nurse) {
            return "Nurse does not exist";
        }

        Nurse.findOneAndDelete({ nurseId: nurseId });
    } catch (err) {
        console.log(`deleteNurse: err`);
    }
}

const deleteNurses = async () => {
    try {
        await Nurse.deleteMany({});
    } catch (err) {
        console.log(`deleteNurses: err`);
    }
}

const nurseLogin = async () => {
    try {
        await Nurse.findOne({ nurseId: nurseId }, (err, nurse) => {
            if (err) {
                console.log(err);
                return err;
            }
            if (!nurse) {
                console.log(`Nurse not found`);
                return `Nurse not found`;
            }

            const validPassword = bcrypt.compare(args.password, nurse.password);
            if (!validPassword) {
                console.log(`Incorrect password`);
                return `Incorrect password`;
            } else {
                const token = jwt.sign({_id: nurse._id, nurseId: nurse.nurseId}, JWT_SECRET, {algorithm: 'HS256', expiresIn: JWT_EXPIRY});
                context.res.cookie('token', token, { httpOnly: true, maxAge: JWT_EXPIRY });
                console.log(`Nurse logged in`);
            }
        });
    } catch (err) {
        console.log(`nurseLogin: err`);
    }
}
const nurseLogout = async (parent, args, context) => {
    context.res.clearCookie('token');
    return "Logged out";
}

module.exports = {
    getNurse,
    getNurses,
    addNurse,
    updateNurse,
    deleteNurse,
    deleteNurses,
    nurseLogin,
    nurseLogout
}