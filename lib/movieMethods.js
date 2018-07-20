const Movie = require("../models/movie");

// return number records
const getMovieCount = () => {
    return Movie.countDocuments({});
};

//Return entire movieList array
const getAllMovies = () => {
    return Movie.find({}, (err, result) => {
        if(err) return err;
        return result;
    });
};

//Return single movie
const getMovie = (title) => {
    return Movie.findOne({'title' : title}, (err, result) => {
        if(err) return err;
        return result;
    });
};

const deleteMovie = (title) => {
    return Movie.findOneAndRemove({'title' : title}, (err, result) => {
        if(err) return err;
        return result;
    });
};

module.exports = {getAllMovies, getMovie, getMovieCount, deleteMovie};