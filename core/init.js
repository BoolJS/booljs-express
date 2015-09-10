'use strict';

module.exports = function (_instance) {
    var Express             = require('express')
    ,   bodyParser          = require('body-parser')
    ,   expressApplication  = new Express();

    // X-Powered-By: bool.js 0.1.0
    expressApplication.use(function (req, res, next) {
        res.header('X-Powered-By', 'bool.js v0.1.0');
        next();
    });

    var configuration = _instance.getComponents().configuration;

    // Sets listening hostname
    expressApplication.set(
        'host',
        process.env.IP || process.env.HOSTNAME ||
        configuration.hostname || '0.0.0.0'
    );

    // Sets listening port
    expressApplication.set(
        'port', process.env.PORT || configuration.port || 3001
    );

    // Enable body-parser middlewares
    expressApplication.use(bodyParser.urlencoded({ extended: true }));
    expressApplication.use(bodyParser.json());

    return q.resolve(expressApplication);
};
