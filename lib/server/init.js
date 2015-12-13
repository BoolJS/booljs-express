'use strict';

module.exports = function (_instance) {
    var Express             = require('express')
    ,   bodyParser          = require('body-parser')
    ,   expressApplication  = new Express();

    // X-Powered-By: bool.js
    expressApplication.use(function (req, res, next) {
        res.header('X-Powered-By', 'bool.js v0.4.3');
        next();
    });

    var config = _instance.getComponents().configuration.get('server');

    // Sets listening hostname
    expressApplication.set(
        'host',
        process.env.IP  || process.env.HOSTNAME || process.env.HOST ||
        config.ip       || config.hostname      || config.host      ||
        '0.0.0.0'
    );

    // Sets listening port
    expressApplication.set('port', process.env.PORT || config.port || 3001);

    // Enable body-parser middlewares
    expressApplication.use(bodyParser.urlencoded({ extended: true }));
    expressApplication.use(bodyParser.json());

    // Enables Json View
    if(!_instance.getComponents().views){
        _instance.insertComponent('views', {});
    }
    _instance.insertComponent(
        'Json', require('../views/json'), _instance.getComponents().views
    );

    return q.resolve(expressApplication);
};
