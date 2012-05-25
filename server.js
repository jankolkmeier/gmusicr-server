var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);
var url = require('url');
var router = new require('routes').Router();
var util = require('util');

io.set('log level', 1);

router.addRoute("/ctrl/:id/:type", function(req, res, params) {
  var action = {
    id: params.id,
    type: params.type
  };
  
  callAction(action, function(err, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      err: err,
      data: data
    }));
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
  for (c in io.sockets.sockets) {
    var client = io.sockets.sockets[c];
    //console.log("%s (%s)", a.id, client._id);
    if (client._id !== undefined && client._id === a.id) {
      if (a.type === 'info') {
          client.emit('info', a, function(err, data) {
            cb(err, data);
          });
          return;
      } else {
        client.emit('action', a, function(err) {
          if (cb) {
            client.emit('info', a, function(err, data) {
              cb(err, data);
            });
          }
        });
        return;
      }
    }
  }
  cb(true);
}

server.listen(process.env.port || 4321, '0.0.0.0');

io.sockets.on('connection', function(client) {
  client.on('action', callAction);

  client.on('register', function(data) {
    console.log('registered player: '+data.id);
    client._id = data.id;
  });

});

