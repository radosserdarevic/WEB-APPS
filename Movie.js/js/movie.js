
// Movie constructor
function Movie(title, length, genre) {
    this.title = title;
    this.length = length;
    this.genre = genre;
}

Movie.prototype.getInfo = function () {
    return this.title + ", duration: " + this.length + "min, genre: " + getGenreAbbreviation(this.genre);
}

export default Movie;