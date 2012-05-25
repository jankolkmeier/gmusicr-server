var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);
var router = new require('routes').Router();

io.set('log level', 1);

router.addRoute("/ctrl/:id/:type", function(req, res, params) {
  var action = {
    id: params.id,
    type: params.type
  };
  
  callAction(action, function(data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  });
});

function handler(req, res) {
  var route = router.match(req.url);
  if (route !== undefined) {
    route.fn.apply({}, [req, res, route.params]);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}

function callAction(a, cb) {
  for (var c in io.sockets.sockets) {
    var client = io.sockets.sockets[c];
    //console.log("%s (%s)", a.id, client._id);
    if (client._id !== undefined && client._id === a.id) {
      var timeout = setTimeout(function() {
        cb({ err: "GMusicR timed out", data: null });
      }, 3000);
      client.emit('action', a, function(res) {
        clearTimeout(timeout);
        cb(res);
      });
      return;
    }
  }
  cb({ err: "No running GMusicR found named "+a.id , data: null });
}

server.listen(process.env.PORT || process.env.port || 4321, '0.0.0.0');

io.sockets.on('connection', function(client) {

  client.on('register', function(data) {
    console.log('registered player: '+data.id);
    client._id = data.id;
  });

});

