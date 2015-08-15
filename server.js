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
    var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');

    //being good and setting encoding to UTF-8
    request.setEncoding("utf8");

    //adding a listner for 'data' from post.
    request.addListener('data', function(postDataChunk){
      postData += postDataChunk;
      console.log('Received POST data chunk "' + postDataChunk + "'.");
    });

    //Listener that ends the reception of data and then forwards to the router
    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });
  }

  //define server->.listen to a port->log that there is a server running.
  http.createServer(onRequest).listen(port, function() {
    console.log('Server running on port ' + port);
  });
}

exports.start = start;
