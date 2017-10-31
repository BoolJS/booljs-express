'use strict';

module.exports = async function (_instance, router, middleware) {
    router.use(middleware);
    return router;
};
