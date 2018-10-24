'use strict';
const Bool = require('booljs');

// Here is where magic happens
module.exports = (async () => {
    try {
        return new Bool('com.example.api', [ require.resolve('..') ])
            .setServerDrivers([ 'booljs.express' ])
            .run();
    } catch (error) {
        console.error(error);
    }
})();
