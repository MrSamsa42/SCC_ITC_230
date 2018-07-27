'use strict';
const express  = require("express");
const app      = express();
const handlebars = require("express-handlebars");
const movieMethods = require("./lib/movieMethods");
const cors = require("cors");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); //location for static files
app.use(require("body-parser").urlencoded({extended: true}));

app.engine(".html", handlebars({
    extname: '.html',
    partialsDir: `${__dirname}/views/partials`
}));

app.set("view engine", ".html");

app.listen(app.get('port'), () => {
    console.log("The server is running!");
});


// API ROUTES
let router = express.Router();

//Middleware to log the type of request that was made
router.use(function(req, res, next) {
    console.log(`You made a ${req.method} request!`);
    next(); 
});

//Return all movies
router.get('/movies', (req, res) =>{
    movieMethods.getAllMovies().then((movies) => {
        if(movies){
            res.json(movies);
        } else {
            return res.status(500).send('Error occurred: database error.');
        }
    }).catch((err)=> {
        res.send(err);
    });
});

//return single movie
router.get('/movies/:title', (req, res) =>{
    let movie = req.params.title;
    movieMethods.getMovie(movie).then((foundMovie) => {
        if(foundMovie){
            res.json(foundMovie);
        } else {
            return res.status(500).send('Error occurred: database error.');
        }
    }).catch((err) => {
        res.send(err);
    });
});

//create a movie
router.post('/movies', (req, res, next) => {
    let newMovie = req.body.movie;
    //newMovie = undefined;
    movieMethods.createMovie(newMovie)
    .then((result) => {
        movieMethods.getMovieCount().then((total) => {
            res.json(
            {
                records_created : result.n,
                records_modified : result.nModified, 
                total_records : total
            });
        });
    })
    .catch((err) => {
    return next(err);
    });
});


//delete a movie
router.post('/movies/delete', (req, res, next) =>{
    let message = "";
    let unwantedMovie = req.body.deleteTitle;
    movieMethods.deleteMovie(unwantedMovie)
    .then((result) => {
        if(result){
            message = `${unwantedMovie} was deleted!`;
            movieMethods.getMovieCount().then((total) => {
                res.json(
                {
                    deleted : "true",
                    records_remaining : total,
                    message: message
                });
            });
        } else {
            message = `${unwantedMovie} was not found!`;
            movieMethods.getMovieCount().then((total) => {
                res.json(
                {
                    deleted : "false",
                    records_remaining : total,
                    message: message
                });
            });
        }
    })
    .catch((err) => {
    return next(err);
    });
});

// MAIN ROUTES
app.get('/', (req, res, next) => {
    movieMethods.getAllMovies()
    .then((items) => {
        res.render('home', {
            pageTitle: "ITC230 - Home",
            allMovies : items
        });
    })
    .catch((err) => {
        return next(err);
    });
});

app.get('/details', (req, res, next) => {
    let title = req.query.title;
    movieMethods.getMovie(title)
    .then((movie) => {
        if(movie){
            res.render('details', {
                pageTitle: "ITC230 - Details",
                movie : movie, 
                title : title
            });
        }
    })
    .catch((err) => {
        return next(err);
    });  
});

app.post('/details', (req, res, next) => {
    let title = req.body.title;
    movieMethods.getMovie(title)
    .then((movie) => {
        res.render('details', {
            pageTitle: "ITC230 - Details",
            movie : movie, 
            title : title
        });
    })
    .catch((err) => {
        return next(err);
    });
});

app.get('/delete', (req, res, next) => {
    let title = req.query.title;
    movieMethods.deleteMovie(title)
    .then((movie) => {
        movieMethods.getMovieCount().then((remaining) => {
            res.render('delete', {
                pageTitle: "ITC230 - Delete",
                movie : movie, 
                title : title,
                remaining : remaining
            });
        });
    })
    .catch((err) => {
    return next(err);
    });
});


app.get('/about', (req, res) => {
   res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.use('/api/v1', router);
app.use('/api/', cors); // set Access-Control-Allow-Origin header for api route

app.use( (req,res) => {
 res.status(404);
 res.render('404');
});

/* HOMEWORK 3 CODE
app.get('/', (req, res) => {
    let allMovies = movies.getAllMovies();
    res.render('home', {
        pageTitle: "ITC230 - Home",
        allMovies : allMovies
    });
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
});*/



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
