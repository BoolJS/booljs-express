'use strict';

module.exports = function (_instance, expressApplication) {

    var API;
    try {
        API = require('bool.js/api');
    } catch (err){
        API = require('booljs-api');
    }

    var express         = require('express')
    ,   async           = require('async')
    ,   each            = q.nbind(async.forEachOfSeries, async)
    ,   store           = API.Plugins.getInstance()
    ,   router          = express.Router();

    // Get route middleware and add it by policy types
    var routeModules                = _instance.getComponents().routes
    ,   routeMiddleware             = store.get(API.RouteMiddleware)
    ,   mandatoryPoliciesMiddleware = []
    ,   omittablePoliciesMiddleware = [];

    return each(routeMiddleware, function (middleware, key, next) {
        try {
            middleware.checkIntegrity();
        } catch (e) {
            next(e);
        } finally {
            if(middleware.type === 'mandatory'){
                mandatoryPoliciesMiddleware.push(middleware);
            } else {
                omittablePoliciesMiddleware.push(middleware);
            }
            next();
        }
    }).then(function () {
        return each(routeModules, function (Module, name, next) {
            var module = new Module();

            return each(module, function (route, key, _next) {
                var applicablePolicies = [];

                return each(mandatoryPoliciesMiddleware, function (mid, key, _n) {
                    for(var policy in mid.policies){
                        if(route[policy] === mid.policies[policy]){
                            applicablePolicies.push(mid.action(route.url, router));
                            return _n();
                        }
                    }
                    _n();
                }).then(function () {
                    return each(omittablePoliciesMiddleware, function (mid, k, _n) {
                        for(var policy in mid.policies){
                            if(route[policy] !== mid.policies[policy]){
                                applicablePolicies.push(
                                    mid.action(route.url, router)
                                );
                                return _n();
                            }
                        }
                        _n();
                    });
                }).then(function () {
                    router[route.method](
                        route.url, applicablePolicies, route.action
                    );
                    _next();
                });
            }).then(function () {
                next();
            });
        });

    }).then(function () {
        require('./handlers')(_instance.getComponents(), router);

        var endpointSettings = (
            _instance.getComponents().configuration.get('enpoint') ||
            {
                base: '/'
            }
        );
        expressApplication.use(endpointSettings.base, router);
        return q.resolve(expressApplication);
    });

};
