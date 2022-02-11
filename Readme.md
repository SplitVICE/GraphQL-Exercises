# GraphQL Exercises

Personal GraphQL exercises on NodeJS + JavaScript frontend.

# Documentation and resources

GraphQL - Curso Practico con Nodejs y Mongodb: <https://youtu.be/Wl8O6wW4FJU>

GraphQL's queries documentation: <https://graphql.org/learn/>

GraphQL's NodeJS/JavaScript documentation: <https://graphql.org/graphql-js/>

# Quick useful documentation

## Aliases

Can be used to change the name of the data received.

```
Query:
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
Returns data as "empireHero" and not as "hero":
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}

```

## Queries with variables

- `GetPerson` is the query name.
- `getPeople` is the schema - root definition.
- Reference: https://graphql.org/learn/queries/#variable-definitions

```
GraphQL query:
query GetPerson($job: String)
  {
    people: getPeople(job: $job)
      {
        _id name age job
      }
    }
variables:
{
  "job": "Student",
}
JavaScript example:
const variables = { job: "Student" };
const query = `query GetPerson($job: String){ people: getPeople(job: $job) { _id name age job } }`;
const { data } = await axios.post("http://localhost/graphql", { query, variables });
```
