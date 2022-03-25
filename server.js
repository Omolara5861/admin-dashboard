const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
})

const ngApp = express();

ngApp.use(express.static('./dist/angular-responsive-sidebar'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/angular-responsive-sidebar/index.html'));
});

ngApp.listen(process.env.PORT || 8080);
