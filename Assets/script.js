function renderNews () {
    var queryURL = "http://cors-anywhere.herokuapp.com/http://api.mediastack.com/v1/news?access_key=c0567e5c2a6bf20ad545f455d2bf2c47";
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(function(response) {
            $("#articleTitle").text(response.data[0].title);
            $("#articleTitle").attr("href", response.data[0].url);
            $("#articlePreview").attr("src", response.data[0].image);
            $("#previewLink").attr("href", response.data[0].image);
            $("#articleContent").text(response.data[0].description);
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

// ===================================================================================
var userInput;
var buttonPress = $(".userSearch");
var localKey = 0;

buttonPress.on("click", function () {
    userInput = $(".inputSearch").val();
    localStorage.setItem(localKey, userInput);
    console.log(userInput);
    searchWeather();

})

function searchWeather() {
    var apiKey = "9975a2d1ef4e7fb59bbba6eef797ea85"
    console.log(userInput);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var cityName = $(".columnOne");
        cityName.append("<p>" + userInput + "" + (moment().format("MM/MD/YY")))
        cityName.append("<p>" + "Temperature: " + response.main.temp + "</p>");

    })
}
