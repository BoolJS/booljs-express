'use strict';

module.exports = function (_instance, expressApplication) {
    var API                 = require('booljs-api')
    ,   async               = require('async')
    ,   middlewarePlugins   = API.Plugins.get('middleware');

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
