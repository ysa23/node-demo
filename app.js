var server = require("./server");

var port = process.env.PORT || 3000;

console.log('Starting listening to port ' + port);

server.start(port);
