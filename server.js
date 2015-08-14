//defining the http server
var http = require('http');
var url = require('url');

//we create an onRequest command which will be used during the server
//creation
function start(route, handle) {
  //defining the port that we will use
  var port = 8888;

  //defining a function for onRequest that will fire the content writing.
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname
    console.log('Request for ' + pathname + ' received.');

    //creating the route WITH a response
    route(handle, pathname, response);
  }
  //define server->.listen to a port->log that there is a server running.
  http.createServer(onRequest).listen(port, function() {
    console.log('There is a server running on ' + port)
  })
};

exports.start = start;
