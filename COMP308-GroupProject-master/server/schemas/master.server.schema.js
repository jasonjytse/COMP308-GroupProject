/**
 * @Author: ebtisam
 */
import { gql } from '@apollo/client';

const REGISTER_NURSE = gql`
  mutation RegisterNurse($nurseId: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addNurse(nurseId: $nurseId, password: $password, firstName: $firstName, lastName: $lastName) {
      nurseId
      firstName
      lastName
    }
  }
`;

const REGISTER_PATIENT = gql`
  mutation RegisterPatient($patientId: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addPatient(patientId: $patientId, password: $password, firstName: $firstName, lastName: $lastName) {
      patientId
      firstName
      lastName
    }
  }
`;





/**
 * @Author: Jason Tse
 */


const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');

const { getNurse,
    getNurses,
    addNurse,
    updateNurse,
    deleteNurse,
    deleteNurses } = require('../resolvers/nurse.server.resolver');


const { getPatient,
    getPatients,
    addPatient,
    updatePatient,
    deletePatient,
    deletePatients } = require('../resolvers/patient.server.resolver');

const { getPatientVitals,
    getPatientVitalsEnteredByPatient,
    getPatientVitalsEnteredByNurse,
    createVitals,
    updateVitals,
    deleteVitals,
    deleteOneVital} = require('../resolvers/vitals.server.resolver');



const nurseType = new GraphQLObjectType({
    name: 'Nurse',
    fields: () => ({
        nurseId: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
    })
});

const patientType = new GraphQLObjectType({
    name: 'Patient',
    fields: () => ({
        patientId: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    })
});

const vitalsType = new GraphQLObjectType({
    name: 'Vitals',
    fields: () => ({
        vitalEntryId: { type: GraphQLString },
        vitalEntryType: { type: GraphQLString },
        vitalDataEntry: { type: GraphQLString },
        vitalDataEntryDate: { type: GraphQLString },
        patientRef: { type: GraphQLID },
        nurseRef: { type: GraphQLID }
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        nurse: {
            type: nurseType,
            args: {
                nurseId: {
                    name: 'nurseId',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (nurseId) => {
                return await getNurse(nurseId);
            }
        },
        nurses: {
            type: new GraphQLList(nurseType),
            resolve: async () => {
                return await getNurses();
            }
        },
        patient: {
            type: patientType,
            args: {
                patientId: {
                    name: 'patientId',
                    type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (patientId) => {
                return await getPatient(patientId)
            }
        },
        patients: {
            type: new GraphQLList(patientType),
            resolve: async () => {
                return await getPatients()
            }
        },
        vital: {
            type: vitalsType,
            args: {
                vitalEntryId: {
                    name: 'vitalEntryId',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (vitalEntryId) => {
                return await getPatientVitals(vitalEntryId)
            }
        },
        vitals: {
            type: new GraphQLList(vitalsType),
            resolve: async () => {
                return await getVitals()
            }
        },
        vitalsEnteredByPatient: {
            type: new GraphQLList(vitalsType),
            args: {
                patientRef: {
                    name: 'vitalsEnteredByPatient',
                    type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (patientRef) => {
                return await getPatientVitalsEnteredByPatient(patientRef)
            }
        },
        vitalsEnteredByNurse: {
            type: new GraphQLList(vitalsType),
            args: {
                nurseRef: { name: 'nurseRef',
                            type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (nurseRef) => {
                return await getPatientVitalsEnteredByNurse(nurseRef)
            }
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addNurse: {
            type: nurseType,
            args: {
                nurseId: {
                    name: 'nurseId',
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    name: 'password',
                    type: new GraphQLNonNull(GraphQLString)
                },
                firstName: {
                    name: 'firstName',
                    type: new GraphQLNonNull(GraphQLString)
                },
                lastName: {
                    name: 'lastName',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (args) => {
                return await addNurse(args)
            }
        },
        updateNurse: {
            type: nurseType,
            args: {
                nurseId: {
                    name: 'nurseId',
                    type: new GraphQLNonNull(GraphQLString) },
                password: {
                    name: 'password',
                    type: new GraphQLNonNull(GraphQLString) },
                firstName: {
                    name: 'firstName',
                    type: new GraphQLNonNull(GraphQLString) },
                lastName: {
                    name: 'lastName',
                    type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (args) => {
                return await updateNurse(args)
            }
        },
        deleteNurse: {
            type: nurseType,
            args: {
                nurseId: {
                    name: 'nurseId',
                    type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                return await deleteNurse(args);
            }
        },
        deleteNurses: {
            type: nurseType,
            resolve: async () => {
                return await deleteNurses();
            }
        },
        addPatient: {
            type: patientType,
            args: {
                patientId: {
                    name: 'patientId',
                    type: new GraphQLNonNull(GraphQLString) },
                password: {
                    name: 'password',
                    type: new GraphQLNonNull(GraphQLString) },
                firstName: {
                    name: 'firstName',
                    type: new GraphQLNonNull(GraphQLString) },
                lastName: {
                    name: 'lastName',
                    type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (args) => {
                return await addPatient(args)
            }
        },
        updatePatient: {
            type: patientType,
            args: {
                patientId: {
                    name: 'patientId',
                    type: new GraphQLNonNull(GraphQLString) },
                password: {
                    name: 'password',
                    type: new GraphQLNonNull(GraphQLString) },
                firstName: {
                    name: 'firstName',
                    type: new GraphQLNonNull(GraphQLString) },
                lastName: {
                    name: 'lastName',
                    type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (args) => {
                return await updatePatient(args)
            }
        },
        deletePatient: {
            type: patientType,
            args: {
                patientId: {
                    name: 'patientId',
                    type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                return await deletePatient(args);
            }
        },
        deletePatients: {
            type: patientType,
            resolve: async () => {
                return await deletePatients();
            }
        },
        addVital: {
            type: vitalsType,
            args: {
                vitalEntryId: {
                    name: 'vitalEntryId',
                    type: new GraphQLNonNull(GraphQLString)
                },
                vitalEntryType: {
                    name: 'vitalEntryType',
                    type: new GraphQLNonNull(GraphQLString)
                },
                vitalDataEntry: {
                    name: 'vitalDataEntry',
                    type: new GraphQLNonNull(GraphQLString)
                },
                vitalDataEntryDate: {
                    name: 'vitalEntryId',
                    type: new GraphQLNonNull(GraphQLString)
                },
                patientRef: {
                    name: 'vitalEntryId',
                    type: new GraphQLNonNull(GraphQLString)
                },
                nurseRef: {
                    name: 'vitalEntryId',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (args) => {
                return await createVitals(args)
            }
        },
        updateVital: {
            type: vitalsType,
            args: {
                vitalEntryId: {
                    name: 'vitalEntryId',
                    type: GraphQLString
                },
                vitalEntryType: {
                    name: 'vitalEntryType',
                    type: GraphQLString
                },
                vitalDataEntry: {
                    name: 'vitalDatEntry',
                    type: GraphQLString
                },
                vitalDataEntryDate: {
                    name: 'vitalDataEntryDate',
                    type: GraphQLString
                },
                patientRef: {
                    name: 'patientRef',
                    type: GraphQLID
                },
                nurseRef: {
                    name: 'nurseRef',
                    type: GraphQLID
                }
            },
            resolve: async (args) => {
                return await updateVitals(args)
            }
        },
        deleteVital: {
            type: vitalsType,
            args: {
                vitalEntryId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                return await deleteOneVital(args);
            }
        },
        deleteVitals: {
            type: vitalsType,
            resolve: async () => {
                return await deleteVitals();
            }
        }
    }
});

const nursePatientVitalSchema = new GraphQLSchema({ query: queryType, mutation: mutationType });
module.exports = nursePatientVitalSchema;