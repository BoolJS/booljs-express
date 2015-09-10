'use strict';

var API = require('booljs-api');
API.Plugins.register(require('./middleware/cors'));

module.exports = {
    init: require('./core/init'),
    middleware: require('./core/middleware'),
    router: require('./core/router'),
    boot: require('./core/boot')
};
