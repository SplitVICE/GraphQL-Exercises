const express = require('express')
const app = express()

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema

} = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const PeopleType = new GraphQLObjectType({
    name: 'People',
    fields: {
        _id: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        job: { type: GraphQLString },
    }
})

const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: {
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        data: { type: GraphQLList(PeopleType) }
    }
})

const QueryType = new GraphQLObjectType({
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
                let { people } = require("./fakeDb");
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

const MutationType = new GraphQLObjectType({
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
                const { people } = require("./fakeDb");
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
                let { people } = require("./fakeDb");
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

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType })

// GraphQL middleware/route set.
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))

app.get('/', (req, res) => {
    res.sendFile(require("path").join(__dirname + "/index.html"))
})

app.listen(4000, () => {
    console.log('GraphQL test server running on localhost:4000/graphql')
})
