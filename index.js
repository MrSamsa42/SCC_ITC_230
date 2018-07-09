const http = require("http");
const fs = require("fs");
const movies = require("./lib/movies");
const url = require('url');

http.createServer( (req, res) => {
    let base = "https://7b4b165d23a942ed9a7b8c118ebed6e5.vfs.cloud9.us-west-2.amazonaws.com";
    let completeURL = new url.URL(req.url, base);
    let path = completeURL.pathname;
    let params = new url.URLSearchParams(completeURL.search);
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
            let deletedMovie = movies.deleteMovie(title);
            let deleteMovieString = (deletedMovie) ? `${intro} ${title} was removed` : `${intro}${title} was not found!`;
            res.end(deleteMovieString);
            break;
        case '/get' :
            res.writeHead(200, {'Content-Type': 'text/plain'});
            title = params.get('title');
            intro = `Searching for ${title}... \n`;
            let movieString = (movies.getMovie(title)) ? `${intro} ${JSON.stringify(movies.getMovie(title))}`:`${intro}${title} was not found!`;
            res.end(movieString);
            break;
        case '/add' :
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let newMovie = {};
            newMovie.title = params.get('title');
            newMovie.year = params.get('year');
            newMovie.imdbID = params.get('imdbID');
            newMovie.poster = params.get('poster');
            let added = movies.addMovie(newMovie);
            let addedMovieString = (added) ? `${newMovie.title} was added!` : `${newMovie.title} already exists!`;
            res.end(addedMovieString);
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

