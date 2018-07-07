const http = require("http");
const fs = require("fs");
const movies = require("./lib/movies");
const url = require('url');

http.createServer( (req, res) => {
    //const routeURL = url.parse(req.url);
    let base = "https://7b4b165d23a942ed9a7b8c118ebed6e5.vfs.cloud9.us-west-2.amazonaws.com";
    const routeURL = new url.URL(req.url, base);
    //let path = routeURL.pathname.toLocaleLowerCase();
    let path = routeURL.pathname;
    console.log(path);
    let params = new url.URLSearchParams(routeURL.search);
    console.log(params.get('title'));
    let title = {};
    let intro = "";
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
        case '/delete' :
            res.writeHead(200, {'Content-Type': 'text/plain'});
            title = params.get('title');
            intro = `Searching for ${title}... \n`;
            let deleteMovieString = `${intro} ${movies.deleteMovie(title)}`;
            res.end(deleteMovieString);
            
            break;
        case '/get' :
            res.writeHead(200, {'Content-Type': 'text/plain'});
            title = params.get('title');
            intro = `Searching for ${title}... \n`;
            let movieString = (movies.getMovie(title)) ? `${intro} ${JSON.stringify(movies.getMovie(title))}` : `${intro}${title} was not found!`;
            res.end(movieString);
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


//console.log(movies.getMovie("Scouts Guide to the Zombie Apocalypse"));
//console.log(movies.deleteMovie("Scouts Guide to the Zombie Apocalypse"));
//console.log(movies.getMovie("Scouts Guide to the Zombie Apocalypse"));