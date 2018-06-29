var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            fs.readFile('public/home.html', function (err, data) {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;
        case '/about' :
            res.writeHead('200', {'Content-Type' : 'text/plain'});
            res.end('This is the about page');
            break;
        default :
            res.writeHead('404', {'Content-Type' : 'text/plain'});
            res.end('Page not found');
            break;
    }
}).listen(process.env.PORT || 3000, function(){
    console.log("The server is running!");
});