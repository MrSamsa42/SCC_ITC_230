const http = require("http");
const fs = require("fs");

http.createServer( (req, res) => {
    let path = req.url.toLowerCase();
    switch(path) {
        case '/':
            fs.readFile('public/home.html', (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;
        case '/about' :
            fs.readFile('public/about.html', (err, data) => {
                if(err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            })
            break;
        default :
            fs.readFile('public/404.html', (err, data) =>{
                if(err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            })
            break;
    }
}).listen(process.env.PORT || 3000, () => {
    console.log("The server is running!");
});