'use strict';

const _ = require('underscore');
const Express = require('express');
const BodyParser = require('body-parser');

module.exports = async function (instance) {
    let expressApplication = new Express();

    // X-Powered-By: bool.js
    expressApplication.use(function (req, res, next) {
        res.header('X-Powered-By', 'booljs');
        next();
    });

    var configuration = instance.getComponents().configuration.get('server');

    // Sets listening hostname
    expressApplication.set('host', (
        process.env.IP || process.env.HOSTNAME || process.env.HOST ||
        (configuration && (
            configuration.ip || configuration.hostname || configuration.host
        )) ||
        '0.0.0.0'
    ));

    // Sets listening port
    expressApplication.set('port', (
        process.env.PORT || (configuration && configuration.port) || 3001
    ));

    // Enable body-parser middlewares
    var bodyParserOptions = (configuration && configuration.body) || undefined;

    if (bodyParserOptions !== undefined) {
        expressApplication.use(BodyParser.urlencoded(
            _.extend({ extended: true }, bodyParserOptions))
        );
        expressApplication.use(BodyParser.json(bodyParserOptions));
    } else {
        expressApplication.use(BodyParser.urlencoded({ extended: true }));
        expressApplication.use(BodyParser.json());
    }

    // Enables Json View
    if (!instance.getComponents().views) {
        instance.insertComponent('views', {});
    }

    instance.insertComponent(
        'Json', require('../views/json'), instance.getComponents().views
    );

    return expressApplication;
};
