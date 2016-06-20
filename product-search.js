var config = require("./config.json");
var SYW = require("./syw-platform/proxy").SYW(config.platform.appId, config.platform.secert);


exports.search = function(term, callback) {
    var url = "/products/search";
    
    SYW.call(url, { "q": term, "fields": "products", "limit": 10 }, config.platform.offlineToken, callback);
}