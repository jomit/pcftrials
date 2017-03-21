var port = (process.env.PORT || 3000);

var http = require('http');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(JSON.stringify(process.env.VCAP_SERVICES));
  response.end("Hello from Nodejs\n");
});

server.listen(port);