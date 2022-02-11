const { v4: uuidv4 } = require('uuid');
module.exports = {
    schema: `
    type People {
        _id: String
        name: String
        age: Int
        job: String
    }

    type Query {
        ping: String
        getPeople(_id: Int, name: String, job: String): [People]
        uuid: String
    }

    type Mutation {
        setPerson(name: String, job: String, age: Int): People
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
            people.push({ _id: uuidv4(), name, age, job });
            return people[people.length - 1];
        },
        uuid: () => uuidv4()
    }
}
