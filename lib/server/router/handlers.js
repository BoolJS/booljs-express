'use strict';

module.exports = function ({ Error, views: { Json } }, router) {
    let json = new Json();

    // Final handler. Acts when a resource call isn't found
    router.use((request, response) => {
        const notImplementedError = new Error(501,
            'not_implemented', 'Method haven\'t been implemented yet');
        if (response.headersSent === false) {
            if (request.path === '/' && request.method === 'GET') {
                json.standard('Welcome to API!', response);
            } else {
                json.error(notImplementedError, response);
            }
        }
    });

    // Error Handler. Processes an error output view.
    router.use((error, req, response, next) => json.error(error, response));
};
