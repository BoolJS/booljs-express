/* global describe, before, it */
'use strict';

describe('Bool.js', function () {
    var resolver = require('../lib/utils/resolve')
    ,   app;

    before(function () {
        app = require('booljs')('com.example.api', [ resolver('') ])
            .setServerLoader('booljs.express')
            .setBase('example');
    });

    it('Boots using express.js', () => app.run());

});
