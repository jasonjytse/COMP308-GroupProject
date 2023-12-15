/**
 *
 * @author: Jason Tse
 */

import getPatient from '../models/patient.server.model';
import getNurse from '../models/nurse.server.model';


const parseUser = (user) => {
    let role = user.role;

    if (role = "Patient") {
        return getPatient(user);
    } else {
        return getNurse(user);
    }
};