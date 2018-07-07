//movie list from http://www.omdbapi.com/?s=zombie&apikey=thewdb
const movieList = [
    {
        Title: "Scouts Guide to the Zombie Apocalypse",
        Year: "2015",
        imdbID: "tt1727776",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NjczNjE4OV5BMl5BanBnXkFtZTgwODk0MjQ5NjE@._V1_SX300.jpg"
    },
    {
        Title: "Zombie",
        Year: "1979",
        imdbID: "tt0080057",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BYjhiMjMxZGEtY2VmZC00OTVmLWExNTQtYmUyNjZiNDJlMWM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        Title: "Zombie Strippers",
        Year: "2008",
        imdbID: "tt0960890",
        Type: "movie",
        Poster: "https://ia.media-imdb.com/images/M/MV5BMTUzNzE3MDQ4OV5BMl5BanBnXkFtZTcwNzkzMjQ5MQ@@._V1_SX300.jpg"
    },
    {
        Title: "I Walked with a Zombie",
        Year: "1943",
        imdbID: "tt0036027",
        Type: "movie",
        Poster: "https://ia.media-imdb.com/images/M/MV5BZjQzMzliN2YtYTVhNC00Zjc4LThjMmYtMTE0ZGUzMWNmYzJlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_SX300.jpg"
    },
    {
        Title: "Scooby-Doo on Zombie Island",
        Year: "1998",
        imdbID: "tt0166792",
        Type: "movie",
        Poster: "https://ia.media-imdb.com/images/M/MV5BNzA1ZmMyYjUtMjMzOS00NGRmLTkzMzQtZmVmN2ExMWI1NjJiXkEyXkFqcGdeQXVyNjg1MDQzMzc@._V1_SX300.jpg"
    },
    {
        Title: "Zombie Nation",
        Year: "2004",
        imdbID: "tt0463392",
        Type: "movie",
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNjE5Njk5Ml5BMl5BanBnXkFtZTcwNDc3MDA0MQ@@._V1_SX300.jpg"
    },
    {
        Title: "White Zombie",
        Year: "1932",
        imdbID: "tt0023694",
        Type: "movie",
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwODU3MDI1OF5BMl5BanBnXkFtZTgwODY4NzYwMjE@._V1._CR81.88333129882812,101.53334045410156,1038,1572.249984741211_SX89_AL_.jpg_V1_SX300.jpg"
    },
    {
        Title: "Zombie Apocalypse",
        Year: "2011",
        imdbID: "tt1876547",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTM3MTEzNjgxM15BMl5BanBnXkFtZTcwMTQyNTA5Ng@@._V1_SX300.jpg"
    },
    {
    Title: "The Zombie Diaries",
    Year: "2006",
    imdbID: "tt0876294",
    Type: "movie",
    Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc0NTk4NjMzOF5BMl5BanBnXkFtZTcwMzk2OTIwMg@@._V1_SX300.jpg"
    },
    {
        Title: "Zombie Holocaust",
        Year: "1980",
        imdbID: "tt0079788",
        Type: "movie",
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYTc1YzgxNzktMWY4Mi00ZmUwLTkwODktMzAwZDUwMzA0YTRhXkEyXkFqcGdeQXVyMzMwMjI2NA@@._V1_SX300.jpg"
    }
];


const getAllMovies = () => {
    return movieList;
}


const getMovie = (title) => {
    if(title)return movieList.find(movie => movie.Title.toLowerCase() === title.toLowerCase());
}

const deleteMovie = (title) => {
    let mov = getMovie(title);
    if(mov){
        let idx = movieList.indexOf(mov);
        if(idx != -1){
            movieList.splice(idx, 1);
            return `${title} was deleted!`;
        }
    } else {
        return `${title} was not found`;
    }
}

module.exports = {getMovie, getAllMovies, deleteMovie};