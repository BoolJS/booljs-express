'use strict';

const http = require('http');

module.exports = async function (expressApplication) {
    let server  = http.createServer(expressApplication);

    let host = expressApplication.get('host');
    let port = expressApplication.get('port');

    await new Promise((resolve, reject) => server.listen(port, host, error => {
        if (error) {
            return reject(error);
        }

        return resolve();
    }));

    if (process.env.NODE_ENV !== 'test') {
        console.log(`Express server listening on http://${host}:${port}`);
    }

    return server;
};
