
const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

function fetchData(onSuccess, onerror) {

    let request = new XMLHttpRequest();
    request.open('GET', API_ENDPOINT, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            // Success!
            let responseData = request.responseText;
            let data = JSON.parse(responseData);
            onSuccess(data);
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();
}

export {
    fetchData
};

