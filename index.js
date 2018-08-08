'use strict';
const express  = require("express");
const app      = express();

const handlebars = require("express-handlebars");
const movieMethods = require("./lib/movieMethods");
const cors = require("cors");

const apiRoute = require("./routes/api");

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

app.get('/spa', (req, res, next) => {
   movieMethods.getAllMovies()
   .then((items) => {
       items = JSON.stringify(items)
       res.render('spa', {
           pageTitle: "ITC230 - React", 
           allMovies: items
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

app.use('/api/v1', apiRoute);
app.use('/api/', cors); // set Access-Control-Allow-Origin header for api route

app.use( (req,res) => {
 res.status(404);
 res.render('404');
});

