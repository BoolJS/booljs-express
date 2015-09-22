/* global describe, before, it */
'use strict';

describe('Bool.js', function () {
    var resolver = require('../lib/utils/resolve')
    ,   app;

    before(function () {
        app = require('bool.js')('com.example.api', [ resolver('') ])
            .setServerLoader('booljs-express')
            .setBase('example');
    });

    it('Boots using express.js', function () { return app.run(); });

});
