/**
 *
 * Author: Jason Tse
 */

const Nurse = require('../models/nurse.server.model');

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
        const result = Nurse.findOne({ nurseId: nurseId });
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
        let oldNurse = Nurse.find({ nurseId: nurseId });
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
        let nurse = Nurse.find({ nurseId: nurseId });
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
        Nurse.deleteMany({});
    } catch (err) {
        console.log(`deleteNurses: err`);
    }
}


module.exports = {
    getNurse,
    getNurses,
    addNurse,
    updateNurse,
    deleteNurse,
    deleteNurses
}