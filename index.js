'use strict';

const { ServerLoader } = require('booljs.api');
const lib = require('./lib/server');
const resolver = require('./lib/utils/resolve');

module.exports = class Express extends ServerLoader {
    constructor () {
        super('booljs.express', [ resolver('lib/middleware/cors') ]);
    }

    init (instance) {
        return lib.init(instance);
    }
    middleware (instance, router, middleware) {
        return lib.middleware(instance, router, middleware);
    }
    preroute (instance, expressApplication) {
        return lib.preroute(instance, expressApplication);
    }
    route (instance, router, middleware, route) {
        return lib.route(instance, router, middleware, route);
    }
    postroute (instance, expressApplication, router) {
        return lib.postroute(instance, expressApplication, router);
    }
    boot (expressApplication) {
        return lib.boot(expressApplication);
    }
};
