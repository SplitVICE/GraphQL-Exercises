const { v4: uuidv4 } = require('uuid');
module.exports = {
    schema: `
    type People {
        _id: Int
        name: String
        age: Int
        job: String
    }

    type Response {
        status: String!,
        description: String!,
        data: [People]
    }

    type Query {
        ping: String
        getPeople(_id: Int, name: String, job: String): [People]
        uuid: String
    }

    type Mutation {
        setPerson(name: String, job: String, age: Int): People
        deletePerson(_id: Int, name: String): Response
    }`,
    root: {
        ping: () => 'pong',
        // Returns people registries.
        getPeople: ({ _id, name, job }) => {
            let { people } = require("./fakeDb");
            if (_id != undefined) people = people.filter(n => n._id === _id);
            if (name != undefined) people = people.filter(n => n.name.toLocaleLowerCase() === name.toLocaleLowerCase());
            if (job != undefined) people = people.filter(n => n.job.toLocaleLowerCase() === job.toLocaleLowerCase());
            return people;
        },
        // Saves a new person registry inside the fake database.
        setPerson: ({ name, job, age }) => {
            const { people } = require("./fakeDb");
            people.push({ _id: people.length + 1, name, age, job });
            return people[people.length - 1];
        },
        deletePerson: ({ _id, name }) => {
            let { people } = require("./fakeDb");
            let found = false;
            if (_id != undefined){
                people = people.filter(n => n._id !== _id);
                found = true;
            }
            if (name != undefined){
                people = people.filter(n => n.name.toLowerCase() !== name.toLowerCase());
                found = true;
            }
            return { 
                status: found == true ? 'success' : 'failed',
                description: found == true ? 'person deleted' : 'person not found',
                data: people
            }
        },
        uuid: () => uuidv4()
    }
}
