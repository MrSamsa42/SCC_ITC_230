const mongoose = require("mongoose");

//DB Connection
const connectionString = require("../credentials/creds.js");
mongoose.connect(connectionString, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

//Schema
const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    year: String,
    imdbID: String,
    poster: String,
});

//Model
module.exports = mongoose.model("Movie", movieSchema);
