'use strict';

module.exports = function ({ Error, views: { Json } }, router) {
    let json = new Json();

    // 404 Handler. Acts when a resource call isn't found
    router.use((request, response) => json.error(
        new Error(404, 'method_not_found', 'Method wasn\'t found'), response
    ));

    // Error Handler. Processes an error output view.
    router.use((error, req, response, next) => json.error(error, response));
};
