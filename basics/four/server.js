var http = require('http');
var app = require('./app');

http.createServer(app.handelRequests).listen(8080);