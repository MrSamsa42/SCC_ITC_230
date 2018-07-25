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
    return Movie.findOneAndRemove({'title' : title}, (err, result) => {
        if(err) return err;
        return result;
    });
};

const createMovie = (title, year, imdbID, poster) => {
    let newMov =
    Movie.create({
        title: title,
        year: year,
        imdbID: imdbID,
        poster: poster
    });
    return newMov;
}

module.exports = {getAllMovies, getMovie, getMovieCount, deleteMovie, createMovie};