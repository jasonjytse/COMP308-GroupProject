/**
 * Author: Jason Tse
 */


const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} = require('graphql');

const nurseType = new GraphQLObjectType({
    name: 'Nurse',
    fields: () => ({
        nurseId: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
    })
});



export default nurseType;