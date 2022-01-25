module.exports = `
    type Query {
        hello: String
        age: Int
        person(_id: Int): [Person]
        uuid: String
    }

    type Person {
        _id: Int
        name: String
        age: Int
        job: String
    }
`;
