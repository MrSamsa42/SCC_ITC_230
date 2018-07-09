//movie list adapted from http://www.omdbapi.com/?s=zombie&apikey=thewdb
const movieList = [
    {
        title: "Scouts Guide to the Zombie Apocalypse",
        year: "2015",
        imdbID: "tt1727776",
        poster: "https://m.media-amazon.com/images/M/MV5BMTY4NjczNjE4OV5BMl5BanBnXkFtZTgwODk0MjQ5NjE@._V1_SX300.jpg"
    },
    {
        title: "Zombie",
        year: "1979",
        imdbID: "tt0080057",
        poster: "https://m.media-amazon.com/images/M/MV5BYjhiMjMxZGEtY2VmZC00OTVmLWExNTQtYmUyNjZiNDJlMWM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        title: "Zombie Strippers",
        year: "2008",
        imdbID: "tt0960890",
        poster: "https://ia.media-imdb.com/images/M/MV5BMTUzNzE3MDQ4OV5BMl5BanBnXkFtZTcwNzkzMjQ5MQ@@._V1_SX300.jpg"
    },
    {
        title: "I Walked with a Zombie",
        year: "1943",
        imdbID: "tt0036027",
        poster: "https://ia.media-imdb.com/images/M/MV5BZjQzMzliN2YtYTVhNC00Zjc4LThjMmYtMTE0ZGUzMWNmYzJlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_SX300.jpg"
    },
    {
        title: "Scooby-Doo on Zombie Island",
        year: "1998",
        imdbID: "tt0166792",
        poster: "https://ia.media-imdb.com/images/M/MV5BNzA1ZmMyYjUtMjMzOS00NGRmLTkzMzQtZmVmN2ExMWI1NjJiXkEyXkFqcGdeQXVyNjg1MDQzMzc@._V1_SX300.jpg"
    },
    {
        title: "Zombie Nation",
        year: "2004",
        imdbID: "tt0463392",
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNjE5Njk5Ml5BMl5BanBnXkFtZTcwNDc3MDA0MQ@@._V1_SX300.jpg"
    },
    {
        title: "White Zombie",
        year: "1932",
        imdbID: "tt0023694",
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwODU3MDI1OF5BMl5BanBnXkFtZTgwODY4NzYwMjE@._V1._CR81.88333129882812,101.53334045410156,1038,1572.249984741211_SX89_AL_.jpg_V1_SX300.jpg"
    }
];

//Return entire movieList array
const getAllMovies = () => {
    return movieList;
}

//Search movieList by title & return found movie object
const getMovie = (title) => {
    if(title)return movieList.find(movie => movie.title.toLowerCase() === title.toLowerCase());
}

const deleteMovie = (title) => {
    let mov = getMovie(title);
    if(mov){
        let idx = movieList.indexOf(mov);
        movieList.splice(idx, 1);
        return mov;
    }
}

const addMovie = (newMovie) => {
    let len = movieList.length
    if(newMovie){
        let mov = getMovie(newMovie.title);
        if(!mov){
            movieList.push(newMovie);
        }
    }
    return movieList.length > len;
}

module.exports = {getMovie, getAllMovies, deleteMovie, addMovie};