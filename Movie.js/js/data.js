
import { Movie } from './movie.js'

var data = {
    movies: [],
    totalMoviesLength: 0
};

// Private functions used within this module
// Not exposed to the public
function getGenreAbbreviation(genreStr) {
    var firstIndex = 0;
    var lastIndex = genreStr.length - 1
    var output = genreStr.charAt(firstIndex) + genreStr.charAt(lastIndex);
    return output.toUpperCase();
}

function calculateTotalLength() {
    var total = 0;

    // Iterate trough movies and calculate length
    data.movies.forEach(function (currentMovie) {
        total += currentMovie.length;
    });

    // Set our new total to our data object
    data.totalMoviesLength = total;
}

// Functions to be exported to public
function addMovie(title, length, genre) {
    var movie = new Movie(title, parseFloat(length), genre);

    data.movies.push(movie);

    return movie;
}

function getTotalLength() {

    // calculate total data before returning
    calculateTotalLength();

    return data.totalMoviesLength;
}

// This is only for TEST
function logData() {
    console.log(data);
}

export {
    addMovie,
    getTotalLength,
    logData
};

