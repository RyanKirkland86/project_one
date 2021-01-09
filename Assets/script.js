function renderNews () {
    var queryURL = "http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?category=technology&apiKey=6f6c9616dafb4bc3bad81c87458b32c9";
    $.ajax({
        url: queryURL,
        method: "GET",
        cors: true
      })
        .then(function(response) {
            $("#articleTitle").text(response.articles[0].title);
            $("#articleTitle").attr("href", response.articles[0].url);
            $("#articlePreview").attr("src", response.articles[0].urlToImage);
            $("#previewLink").attr("href", response.articles[0].urlToImage);
            $("#articleContent").text(response.articles[0].description);
    });
}

renderNews();

var hyperlink = $(".hyperlink");
var link = [
    "https://www.w3schools.com/",
    "https://developer.mozilla.org/en-US/",
    "http://stackoverflow.com/",
    "https://github.com/"
]

function reference() {
        hyperlink.append("<a href=" + link[0] + ">" + "<img src='Assets/w3.png' width='200' height = '132'" + "</a>");
        hyperlink.append("<a href=" + link[1] + ">" + "<img src='Assets/mdn.png' width='200' height = '132'" + "</a>");
        hyperlink.append("<a href=" + link[2] + ">" + "<img src='Assets/stack.png' width='200' height = '132'" + "</a>");
        hyperlink.append("<a href=" + link[3] + ">" + "<img src='Assets/github.png' width='200' height = '132'" + "</a>");
}
reference();

function getJoke () {
    var queryURL = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist,explicit&type=twopart";
    $.ajax({
        url: queryURL,
        method: "GET",
    })
        .then(function(response) {
            console.log(response);
            $("#jokeSetup").text(response.setup);
            $("#jokeDelivery").text(response.delivery);
        });
}

getJoke();