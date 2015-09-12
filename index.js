'use strict';

var API = require('booljs-api');
API.Plugins.register(require('./lib/middleware/cors'));

module.exports = {
    init: require('./lib/init'),
    middleware: require('./lib/middleware'),
    router: require('./lib/router'),
    boot: require('./lib/boot')
};
