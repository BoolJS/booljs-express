'use strict';

const Express = require('express');
const BodyParser = require('body-parser');

module.exports = async function (instance) {
    const application = new Express();

    exports.setPoweredBy(application);
    exports.configureServer(application, instance
        .getComponents().configuration.get('server'));
    exports.configureBodyParser(application, instance
        .getComponents().configuration.get('server'));

    // Enables Json View
    if (!instance.getComponents().views) {
        instance.insertComponent('views', {});
    }

    instance.insertComponent(
        'Json', require('../views/json'), instance.getComponents().views
    );

    return application;
};

/**
 * Renders the X-Powered-By header
 * @param  {ExpressApplication} application - The express application
 */
exports.setPoweredBy = function (application) {
    application.use((request, response, next) => {
        response.header('X-Powered-By', 'booljs');
        next();
    });
};

/**
 * Configures server options
 * @param  {ExpressApplication} application - The express application
 * @param  {Object} [configuration={}] - The configuration object
 */
exports.configureServer = function (application, configuration = {}) {
    let { IP, HOSTNAME, HOST, PORT } = process.env;
    let { ip, hostname, host, port } = configuration;
    // Sets listening hostname
    application.set('host',
        IP || HOSTNAME || HOST || ip || hostname || host || '0.0.0.0');

    // Sets listening port
    application.set('port', PORT || port || 3001);
};

/**
 * Enables body-parser middlewares
 * @param  {ExpressApplication} application - The express application
 * @param  {Object} [configuration={}] - The configuration object
 */
exports.configureBodyParser = function (application, configuration = {}) {
    let { body: options = {} } = configuration;

    application.use(BodyParser.urlencoded({ extended: true, ...options }));
    application.use(BodyParser.json({ ...options }));
};
