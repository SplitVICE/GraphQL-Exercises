const express = require('express')
const app = express()

const { graphqlHTTP } = require('express-graphql')
const graphQlRootSchema = require('./graphql')

// GraphQL middleware set.
app.use('/graphql', graphqlHTTP({ // GraphQL route.
	schema: require('graphql').buildSchema(graphQlRootSchema.schema),
	rootValue: graphQlRootSchema.root,
	graphiql: true // Web testing interface => http://localhost:port/graphql
}))

app.get('/', (req, res) => {
	res.sendFile(require("path").join(__dirname + "/index.html"))
})

app.listen(4000, () => console.log('GraphQL test server running on localhost:4000/graphql'))
