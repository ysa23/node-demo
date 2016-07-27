var http = require("http");
var url = require("url");
var fs = require("fs");

var productSearch = require("./product-search");

exports.start = function(port) {
    http.createServer((request, response) => {
        var path = url.parse(request.url).pathname;
        
        switch(path) {
            case "/":
                respond("Hello friend");
                break;
            case "/favicon.ico":
                renderIcon();
                break;  
            default:
                search(path.substring(1));
                break;
        }
        
        function search(term) {
            productSearch.search(term, (err, products) => {
                if (err) {
                    console.error(err);
                    respondError("Ooch....")
                    return;
                }
                
                renderImages(products);    
            })
        }
        
        function renderImages(products) {
            response.writeHead(200, {"Content-Type": "text/html"});
            for(var i = 0; i < products.length; i++) {
                response.write(`<img src='${products[i].imageUrl}' style='width:300px;height:300px;'/>`);
            }
            
            response.end();
        }
        
        function json(content){
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(result);
            response.end();
        }
        
        function respond(content) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`<h1>${content}</h1>`);
            response.end();
        }
        
        function respondError(content) {
            response.writeHead(500, {"Content-Type": "text/html"});
            response.write(`<h1 style='color=red'>${content}</h1>`);
            response.end();
        }
        
        function renderIcon() {
            fs.readFile('./favicon.ico', (err, img) => {
                response.writeHead(200, {"Content-Type": "image/x-icon"});
                response.end(img,'binary');
            });
        }
    }).listen(port);
}

