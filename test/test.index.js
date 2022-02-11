const assert = require('assert');
const axios = require('axios');
const API = "http://localhost:4000/graphql";

async function axiosPost(query) {
    const { data } = await axios.post(API, { query });
    return data.data;
}

async function axiosPostVariables(query, variables) {
    const { data } = await axios.post(API, { query, variables });
    return data.data;
}

describe("Query responses", () => {
    it("Ping - Pong", async () => {
        const query = "{ ping }";
        const data = await axiosPost(query);
        assert(data.ping === "pong");
    });
    it("UUID", async () => {
        const query = "{ uuid }";
        const data = await axiosPost(query);
        assert((() => {
            const { uuid } = data;
            return uuid !== undefined && uuid.length === 36
        })());
    });
    it("People", async () => {
        const query = "{ people: getPeople { _id name age job } }";
        const data = await axiosPost(query);
        assert((() => {
            const { people } = data;
            return people !== undefined &&
                people.length >= 5 &&
                Object.keys(people[0]).length === 4
        })());
    })
});

describe("Query filtered responses", () => {
    it("People filter name", async () => {
        const name = "Alberto";
        const query = `{ people: getPeople(name: "${name}") { _id name age job } }`;
        const data = await axiosPost(query);
        assert((() => {
            const { people } = data;
            return people !== undefined &&
                people.length === 1 &&
                people[0].name === name &&
                Object.keys(people[0]).length === 4
        })());
    });
    it("People filter name using variables", async () => {
        const variables = { job: "Student" };
        const query = `query GetPerson($job: String){ people: getPeople(job: $job) { _id name age job } }`;
        const data = await axiosPostVariables(query, variables);
        assert((() => {
            const { people } = data;
            return people !== undefined &&
                people.length === 1 &&
                people[0].job === variables.job &&
                Object.keys(people[0]).length === 4
        })());
    });
})

describe("Query mutation", () => {
    it("Adding a new person registry", async () => {
        // Gets the data first to see if the new registry was added.
        const dataBefore = await axiosPost("{ people: getPeople { _id name age job } }");
        // Posts the new registry.
        const query = `
            mutation
            { person: setPerson(name: "VICE" job: "programmer" age: 99 )
            { _id name job age } }`;
        await axios.post(API, { query });
        const dataAfter = await axiosPost("{ people: getPeople { _id name age job } }");
        assert((() => {
            return dataBefore.people.length < dataAfter.people.length &&
            dataAfter.people[dataAfter.people.length - 1].name === "VICE" &&
            Object.keys(dataAfter.people[dataAfter.people.length - 1]).length === 4
        })());
    })
});
