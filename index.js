'use strict'
const express  = require('express');
const app      = express();
let handlebars = require("express-handlebars");
const movies   = require("./lib/movies");

app.set('port', process.env.PORT || 3000);
//app.use(express.static(__dirname + '/public')); //location for static files
app.use(express.static("public"));
app.use(require("body-parser").urlencoded({extended: true}));

app.engine(".html", handlebars({
    extname: '.html',
    partialsDir: `${__dirname}/views/partials`
}));

app.set("view engine", ".html");

app.listen(app.get('port'), () => {
    console.log("The server is running!");
});

app.get('/', (req, res) => {
    let allMovies = movies.getAllMovies();
    res.render('home', {
        pageTitle: "ITC230 - Home",
        allMovies : allMovies
    });
    //res.send('This is the home page');
});

app.get('/details', (req, res) => {
    let title = req.query.title;
    let movie = movies.getMovie(title);
    if(movie){
        res.render('details', {
            pageTitle: "ITC230 - Details",
            movie : movie, 
            title : title
        });
    }
});

app.post('/details', (req, res) => {
    let title = req.body.title;
    let movie = movies.getMovie(title);
    res.render('details', {
        pageTitle: "ITC230 - Details",
        movie : movie,
        title : title
    });
});

app.get('/delete', (req, res) => {
    let title = req.query.title;
    let movie = movies.deleteMovie(title);
    let remaining;
    if(movie){
        remaining = movies.getAllMovies().length;
    }
    res.render('delete', {
        pageTitle: "ITC230 - Delete",
        movie : movie, 
        title : title,
        remaining : remaining
    });
});

app.get('/about', (req, res) => {
   res.render('about');
});

app.get('/add', (req, res) => {
    res.type('text/html');
    res.send('This is where the add page will go');
});

app.use( (req,res) => {
 //res.type('text/plain'); 
 res.status(404);
 res.render('404');
});


/* HOMEWORK 2 CODE

http.createServer( (req, res) => {
    let base = `${req.headers['x-forwarded-proto']}://${req.headers.host}`;
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
*/
