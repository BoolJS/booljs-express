/* global describe, before, it */
'use strict';

describe('Bool.js', function () {
    var app
    ,   resolver        = require('../lib/utils/resolve')
    ,   booljs_express  = resolver('');

    before(function () {
        app = require('bool.js')('com.example.api')
            .setServerLoader(booljs_express)
            .setBase('example');
    });

    it('Boots using express.js', function () { return app.run(); });

});
