'use strict';

module.exports = function (_instance, expressApplication) {

    var API;
    try {
        API = require('bool.js/api');
    } catch (err){
        API = require('booljs-api');
    }

    var async               = require('async')
    ,   middlewarePlugins   = API.Plugins.getInstance().get(API.Middleware);

    var each = q.nbind(async.eachSeries, async);

    return each(middlewarePlugins, function (plugin, next) {
        try {
            plugin.checkIntegrity();
            if(plugin.route && plugin.method){
                expressApplication[plugin.method](plugin.route, plugin.action);
            } else if(plugin.route){
                expressApplication.use(plugin.route, plugin.action);
            } else {
                expressApplication.use(plugin.action);
            }
        } catch(err){
            next(err);
        }
    }).then(function () {
        return q.resolve(expressApplication);
    });

};
