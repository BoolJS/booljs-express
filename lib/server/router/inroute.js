'use strict';

module.exports = async function (instance, router, middleware, route) {
    router[route.method](route.url, middleware, route.action);
    return router;
};
