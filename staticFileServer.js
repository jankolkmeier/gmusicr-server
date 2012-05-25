var url = require("url");
var path = require("path");
var fs = require("fs");

var server = function(base) {
  if (base === undefined) base = "";
  var r404 = function(res) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
  }
  var fn = function(req, res) {
    var baseUrl = base;
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), baseUrl, uri);
      
    path.exists(filename, function(exists) {
      if (!exists) {
        return r404(res);
      } else if (fs.statSync(filename).isDirectory()) {
        filename = path.join(filename, 'index.html');
      }
      path.exists(filename, function(exists) {
        if (!exists) {
          return r404(res);
        }
        
        fs.readFile(filename, "binary", function(err, file) {
          if(err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(err + "\n");
            res.end();
            return;
          }

          res.writeHead(200);
          res.write(file, "binary");
          res.end();
        });
      });
    });
  }
  return fn;
}

module.exports = server;
