
$('#search').on('click', function (e) {

    var url = "https://api.github.com/search/users?q=" + $('$input').val();

    var request = $.ajax({
        url: url,
        method: "GET"
    });

    request.done(function (user) {

    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
});


