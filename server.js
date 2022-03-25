const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(express.static('./dist/angular-responsive-sidebar'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/angular-responsive-sidebar/index.html'));
});

ngApp.listen(process.env.PORT || 8080);
