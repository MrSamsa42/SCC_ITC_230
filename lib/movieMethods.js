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
    let my_pattern = new RegExp("^" + title + "$", 'i');
    //let my_pattern = new RegExp(title,"i");
    return Movie.findOne({'title' : {$regex : my_pattern}}, (err, result) => {
        if(err) return err;
        return result;
    });
};

//

const deleteMovie = (title) => {
    let my_pattern = new RegExp("^" + title + "$", 'i');
    return Movie.findOneAndRemove({'title' : {$regex : my_pattern}}, (err, result) => {
        if(err) return err;
        return result;
    });
};

const createMovie = (movie) => {
    return Movie.update({'title': movie.title}, movie, {upsert:true}, (err, result) => {
        if(err) return err;
        return result;
    });
};

module.exports = {getAllMovies, getMovie, getMovieCount, deleteMovie, createMovie};