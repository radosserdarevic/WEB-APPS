var dataController = (function () {

    var data = {
        movies: [],
        totalMoviesLength: 0
    };

    // Movie constructor
    function Movie(title, length, genre) {
        this.title = title;
        this.length = length;
        this.genre = genre;
    }

    Movie.prototype.getInfo = function () {
        return this.title + ", duration: " + this.length + "min, genre: " + getGenreAbbreviation(this.genre);
    }

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

    return {
        addMovie: addMovie,
        getTotalLength: getTotalLength,
        // ONLY FOR TEST
        log: logData
    };

})();

var UIController = (function () {

    var DOMStrings = {
        inputTitle: '.movie-title',
        inputLength: '.movie-length',
        selectGenre: '.genre-select',
        containerMovieList: '.movie-list ul',
        containerError: '.movie-error',
        buttonAddMovie: '.create-movie',
        formElement: 'form',
        containerTotalLength: '.total-length span'
    }

    function collectInput() {
        var titleElement = document.querySelector(DOMStrings.inputTitle);
        var lengthElement = document.querySelector(DOMStrings.inputLength);
        var genreSelectElement = document.querySelector(DOMStrings.selectGenre);
        var genreOptionElement = genreSelectElement.options[genreSelectElement.selectedIndex];

        var result = {
            title: titleElement.value,
            length: lengthElement.value,
            genre: genreOptionElement.value
        }

        return result;
    }

    function displayListItem(movie) {
        var listEl = document.querySelector(DOMStrings.containerMovieList);

        var htmlItem = "<li>" + movie.getInfo(); + "</li>"

        listEl.insertAdjacentHTML('beforeend', htmlItem);
    }

    function clearFormInputs() {

        // Reset forma data
        document.querySelector(DOMStrings.formElement).reset();

        // Reset error if any
        document.querySelector(DOMStrings.containerError).textContent = "";

        // Set focus to title input
        document.querySelector(DOMStrings.inputTitle).focus();
    }

    function showError(input) {
        var errorMsg = 'Unknown error!';

        if (!input.title) {
            errorMsg = "Enter title!"
        } else if (!input.length) {
            errorMsg = "Enter length!"
        } else if (!input.genre) {
            errorMsg = "Select genre!"
        }

        document.querySelector(DOMStrings.containerError).textContent = errorMsg;
    }

    function displayTotalLength(tLength) {

        // If length is not passed set default value
        tLength = tLength || '-';

        document.querySelector(DOMStrings.containerTotalLength).textContent = String(tLength);
    }

    function getDOMStrings() {
        return DOMStrings;
    }

    return {
        getInput: collectInput,
        displayListItem: displayListItem,
        displayTotalLength: displayTotalLength,
        getDOMStrings: getDOMStrings,
        clearInputs: clearFormInputs,
        displayError: showError
    };

})();

var mainController = (function (dataCtrl, UICtrl) {

    function setupEventListeners() {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.buttonAddMovie).addEventListener('click', function () {
            ctrlAddMovieItem();
        });

        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                ctrlAddMovieItem();
            }
        });
    }

    function ctrlUpdateTotalLength() {

        // 1. Get calculated length
        var totalLength = dataCtrl.getTotalLength();

        // 2. Update the UI with new total length
        UICtrl.displayTotalLength(totalLength);
    }

    function ctrlAddMovieItem() {
        // 1. get form data (UI)
        var input = UICtrl.getInput();
        // console.log(input);

        // 1.1 Validate data validity
        if (!input.title || !input.length || !input.genre) {
            // throw new Error('Something bad happened');
            // alert("Error!")
            UICtrl.displayError(input);
            return;
        }

        // 2. Add movie to list
        var movie = dataCtrl.addMovie(input.title, input.length, input.genre);
        // console.log(movie);

        // 3. Clear form inputs
        UICtrl.clearInputs();

        // 4. show list on UI
        UICtrl.displayListItem(movie);

        // 5. Update total length UI
        ctrlUpdateTotalLength();

    }

    return {
        init: function () {
            console.log("App has started");
            setupEventListeners();
        }
    }

})(dataController, UIController);

document.onload(function () {
    mainController.init();
});