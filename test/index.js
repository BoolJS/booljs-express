'use strict';

const resolver = require('../lib/utils/resolve');
const Bool = require('booljs');
const Agent = require('supertest');

describe('Bool.js', function () {
    let server;

    before(async () => {
        let app = await new Bool('com.example.api', [ resolver('') ])
            .setServerDrivers('booljs.express')
            .setBase('example')
            .run();

        server = new Agent(app.server);
    });

    it('GET / -> 200 OK', () => server.get('/').expect(200));

    it('GET /undefined -> 501 Not Implemented', () => server
        .get('/undefined')
        .expect(501));

    it('GET /error -> 401 Custom Error', () => server
        .get('/error')
        .expect(401));
});
