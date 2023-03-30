const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')

const { PeopleType } = require('./type')
const DB = require('path').resolve(__dirname, '../DB.js')

module.exports = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getPeople: {
            type: new GraphQLList(PeopleType),
            args: {
                _id: { type: GraphQLInt },
                name: { type: GraphQLString },
                job: { type: GraphQLString }
            },
            resolve(_, args) {
                let { people } = require(DB);
                if (args._id != undefined)
                    people = people.filter(n => n._id === _id);
                if (args.name != undefined)
                    people = people.filter(n => n.name.toLocaleLowerCase() === args.name.toLowerCase());
                if (args.job != undefined)
                    people = people.filter(n => n.job.toLocaleLowerCase() === args.job.toLowerCase());
                return people;
            }
        },
        ping: {
            type: GraphQLString,
            resolve(_, __) {
                return 'pong'
            }
        },
        uuid: {
            type: GraphQLString,
            args: {
                length: { type: GraphQLInt }
            },
            resolve(_, { length }) {
                const { v4: uuid } = require('uuid')
                let _uuid = uuid()
                if (length) {
                    _uuid = _uuid.slice(0, length)
                }
                return _uuid
            }
        }
    }
})
