module.exports = {
    schema: `type Query {
        ping: String
        people(_id: Int, name: String, job: String): [People]
        uuid: String
    }

    type People {
        _id: Int
        name: String
        age: Int
        job: String
    }`,
    root: {
        ping: () => 'pong',
        /**
         * Returns people registries.
         * @param {Number} _id ID of person registry to filter.
         * @param {String} name Name of the person registry to filter.
         * @param {String} job Job of the person registry to filter.
         * @returns {Array}
         */
        people: ({ _id, name, job }) => {
            let arr = require("./fakeDb").people;
            if (_id != undefined) arr = arr.filter(n => n._id === _id);
            if (name != undefined) arr = arr.filter(n => n.name.toLocaleLowerCase() === name.toLocaleLowerCase());
            if (job != undefined) arr = arr.filter(n => n.job.toLocaleLowerCase() === job.toLocaleLowerCase());
            return arr;
        },
        uuid: () => uuidv4()
    }
}
