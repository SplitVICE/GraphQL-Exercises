const { graphqlHTTP } = require('express-graphql')
const express = require('express')
const { GraphQLSchema } = require('graphql')

const app = express()

// Imports GraphQL schema endpoints and types.
const QueryType = require('./graphql/query')
const MutationType = require('./graphql/mutation')

// Creates GraphQL schema.
const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType })

// GraphQL middleware/route set.
app.use('/graphql', graphqlHTTP(
    {
        schema: schema, // Sets GraphQL schema.
        graphiql: true // Starts GraphiQL.
    }
))

// Simple HTTP root route.
app.get('/', (req, res) => {
    res.sendFile(require("path").join(__dirname + "/index.html"))
})

// Server start.
app.listen(4000, () => {
    console.log('GraphQL test server running on localhost:4000/graphql')
})
