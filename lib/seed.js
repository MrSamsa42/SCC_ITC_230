//REMOVE ALL MOVIES AND REPOPULATE DB

'use strict';
const movies = require("./movies");
const Movie = require("../models/movie");
let movs = movies.getAllMovies();

async function seedDB(){
    try{
        await Movie.remove({});
        console.log('movies removed');
        
        for(let mov of movs){
            Movie.create({
                title: mov.title,
                year: mov.year,
                imdbID: mov.imdbID,
                poster: mov.poster
            });
        }
        console.log("movies have been added!");
    } catch(err) {
        console.log(err);
    }
}

seedDB();

