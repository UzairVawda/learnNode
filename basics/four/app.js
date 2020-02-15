var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('Error: Page Not Found');
        } else {
            response.write(data);
        }
        response.end()
    });
}

module.exports = {
    handelRequests: function(request, response) {
        response.writeHead(200, { 'Content-Type': 'type/html' });
        var path = url.parse(request.url).pathname;
        switch (path) {
            case '/':
                renderHTML('./index.html', response);
                break;
            case '/signin':
                renderHTML('./signIn.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('Error: Page Not Found');
                response.end()
        }
    }
};