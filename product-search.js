var config = require("./config.json");
var SYW = require("syw-platform").SYW(config.platform.appId, config.platform.secert);


exports.search = (term, callback) => {
    var url = "/products/search";
    
    SYW.callEndpoint(url, { "q": term, "fields": "products", "limit": 50 }, config.platform.offlineToken, (err, result) => {
        callback(err, result.products);
    });
}