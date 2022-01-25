const fakeDb = require('./fakeDb');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    hello: () => 'Hello world!',
    age: () => 30,
    person: (args) => {
        let arr = fakeDb.people;
        // Returns person registry by given ID.
        if (args._id != undefined) arr = arr.filter(n => n._id === args._id);
        return arr;
    },
    uuid: () => uuidv4()
}
