/* global describe, before, it */
'use strict';

const resolver = require('../lib/utils/resolve');
const Bool = require('booljs');
const Agent = require('supertest');

describe('Bool.js', function () {
    let app, server;

    before(() => {
        app = new Bool('com.example.api', [ resolver('') ])
            .setServerDrivers([ 'booljs.express' ])
            .setBase('example');
        server = new Agent('http://localhost:8080');
    });

    it('Boots using express.js', () => app.run());

    it('GET / -> 200 OK', () => server.get('/').expect(200));

    it('GET /undefined -> 501 Not Implemented', () => server
        .get('/undefined')
        .expect(501));
});
