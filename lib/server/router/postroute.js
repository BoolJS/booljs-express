'use strict';

const Handlers = require('./handlers');

module.exports = function (instance, application, router) {
    Handlers(instance.getComponents(), router);

    const configuration = instance.getComponents().configuration.get('server');
    application.use((configuration && configuration.base) || '/', router);

    return application;
};
