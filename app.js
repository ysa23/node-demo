var server = require("./server");

var port = process.env.PORT || 3002;

console.log('Starting listening to port ' + port);

server.start(port);
