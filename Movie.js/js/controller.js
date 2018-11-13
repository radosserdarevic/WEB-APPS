
import * as data from './data.js';
import * as ui from './ui.js';

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

function init() {
    console.log("App has started");
    setupEventListeners();
}

export {
    init
}