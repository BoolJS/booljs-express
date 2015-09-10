'use strict';

module.exports = function (_instance, expressApplication) {

    // Get route middleware and add it by policy types
    var API             = require('booljs-api')
    ,   express         = require('express')
    ,   async           = require('async')
    ,   routeMiddleware = API.Plugins.get('routeMiddleware')
    ,   each            = q.nbind(async.forEachOfSeries, async)
    ,   router          = express.Router();

    var mandatoryPoliciesMiddleware = _.filter(
        routeMiddleware, function (middleware) {
            return middleware.policyType === 'mandatory';
        }
    );

    var omittablePoliciesMiddleware = _.filter(
        routeMiddleware, function (middleware) {
            return middleware.policyType !== 'mandatory';
        }
    );

    var routeModules = _instance.getComponents().routes;

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
