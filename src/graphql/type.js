const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')

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

module.exports = { PeopleType: PeopleType, ResponseType: ResponseType }
