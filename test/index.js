/* global describe, before, it */
'use strict';

describe('Bool.js', function () {
    var app;

    before(function () {
        app = require('bool.js')('com.example.api').setBase('example');
    });

    it('Boots using express.js', function () { return app.run(); });

});
