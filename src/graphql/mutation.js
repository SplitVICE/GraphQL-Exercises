const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql')

const { PeopleType, ResponseType } = require('./type')
const DB = require('path').resolve(__dirname, '../DB.js')

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        setPerson: {
            type: PeopleType, // The type that is returned.
            args: {
                name: { type: GraphQLString },
                job: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(_, args) {
                const { people } = require(DB);
                people.push({
                    _id: people.length + 1,
                    name: args.name,
                    age: args.age,
                    job: args.job
                });
                return people[people.length - 1];
            }
        },
        deletePerson: {
            type: ResponseType,
            args: {
                _id: { type: GraphQLInt },
                name: { type: GraphQLString }
            },
            resolve(_, { _id, name }) {
                let { people } = require(DB);
                let found = false;
                if (_id != undefined) {
                    console.log(_id)
                    people = people.filter(n => n._id !== _id);
                    found = true;
                }
                if (name != undefined) {
                    people = people.filter(n => n.name.toLowerCase() !== name.toLowerCase());
                    found = true;
                }
                return {
                    status: found == true ? 'success' : 'failed',
                    description: found == true ? 'person deleted' : 'person not found',
                    data: people
                }
            }
        }
    }
})
