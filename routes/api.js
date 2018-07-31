'use strict';
const express  = require("express");
const movieMethods = require("../lib/movieMethods");

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

module.exports = router;