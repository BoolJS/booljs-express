'use strict';

module.exports = function (_instance, expressApplication, plugin) {

    if(plugin.route && plugin.method){
        expressApplication[plugin.method](plugin.route, plugin.action);
    } else if(plugin.route){
        expressApplication.use(plugin.route, plugin.action);
    } else {
        expressApplication.use(plugin.action);
    }

    return q.resolve(expressApplication);

};
