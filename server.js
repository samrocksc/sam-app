//defining the http server
var http = require('http');
var url = require('url');

//we create an onRequest command which will be used during the server
//creation
function start(route, handle) {
  //defining the port that we will use
  var port = 8888;

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname
    console.log('Request for ' + pathname + ' received.');

    //creating a route to pathname object
    route(handle, pathname);

    //writing to the header and sending data to the body
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write("Hello World");
    response.end();
  }

  //define server->.listen to a port->log that there is a server running.
  http.createServer(onRequest).listen(8888, function() {
    console.log('There is a server running on ' + port)
  })
};

exports.start = start;
