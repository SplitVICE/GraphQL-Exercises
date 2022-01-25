// Tutorials
// Graphql, Curso Practico con Nodejs y Mongodb - https://youtu.be/Wl8O6wW4FJU
// graphql-js:  https://graphql.org/graphql-js/

const express = require('express');
const app = express();

// ============================================================
// GraphQL settings
// ============================================================
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const resolvers = require('./graphql/resolvers');
const schemaContent = require('./graphql/schema');
const schema = buildSchema(schemaContent);
// ============================================================

// Middlewares
app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: resolvers,
	graphiql: true,
}));

app.listen(4000, () => console.log('GraphQL test server running on localhost:4000/graphql'));
