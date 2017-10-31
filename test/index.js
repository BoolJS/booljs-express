/* global describe, before, it */
'use strict';

const resolver = require('../lib/utils/resolve');
const Bool = require('booljs');

describe('Bool.js', function () {
    let app;

    before(() => {
        app = new Bool('com.example.api', [ resolver('') ])
            .setServerDrivers([ 'booljs.express' ])
            .setBase('example');
    });

    it('Boots using express.js', () => app.run());
});
