'use strict';

var API         = require('booljs.api')
,   lib         = require('./lib/server')
,   resolver    = require('./lib/utils/resolve');

module.exports = class Express extends API.ServerLoader{
    constructor(){
        super('booljs.express', [ resolver('lib/middleware/cors') ]);
    }

    init(_instance){
        return lib.init(_instance);
    }
    middleware(_instance, router, middleware){
        return lib.middleware(_instance, router, middleware);
    }
    preroute(_instance, expressApplication){
        return lib.preroute(_instance, expressApplication);
    }
    route(_instance, router, middleware, route){
        return lib.route(_instance, router, middleware, route);
    }
    postroute(_instance, expressApplication, router){
        return lib.postroute(_instance, expressApplication, router);
    }
    boot(expressApplication){
        return lib.boot(expressApplication);
    }
};
