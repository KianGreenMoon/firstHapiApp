console.log('Hello!');

'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

// Simple API Route
server.route({
    method: 'GET',
    path: '/api',
    handler: (request, h) => {

        return {"text": "foo"}
    }
});

const init = async () => {

    await server.register(require('inert'));

    // HomePage Route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.file('./public/index.html');
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
