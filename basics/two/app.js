var http = require('http');
var funcitons = require('./function');

function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(funcitons.myStr);
    funcitons.printInfo();
    response.end();
}

http.createServer(onRequest).listen(8080);