
// ===================================================================================

function renderNews () {
    var queryURL = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=rBdT9Ta3VCBY52rY43X4LfdNrg58vknE";
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(function(response) {
            $("#articleTitle").text(response.results[0].title);
            $("#articleTitle").attr("href", response.results[0].url);
            $("#articlePreview").attr("src", response.results[0].multimedia[0].url);
            $("#previewLink").attr("href", response.results[0].multimedia[0].url);
            $("#articleContent").text(response.results[0].abstract);
    });
}

renderNews();

// ===================================================================================

var noteList = [];

function saveNotes (event) {
    event.preventDefault();
    var noteTitle = $("#noteTitle");
    var noteBody = $("#noteBody");
    if (localStorage.getItem("noteList")) {
        noteList = JSON.parse(localStorage.getItem("noteList"));
    }
    if (!noteList.includes(noteTitle.val())) {
        noteList.push(noteTitle.val());
        localStorage.setItem("noteList",JSON.stringify(noteList));
        localStorage.setItem(noteTitle.val(),noteBody.val());
    }
    renderNoteList(noteList);
    newNote();
}

function loadNote (event) {
    var i = $(this).data("index");
    var noteTitle = $("#noteTitle");
    var noteBody = $("#noteBody");
    noteTitle.val(noteList[i]);
    noteBody.val(localStorage.getItem(noteList[i]));
}

function newNote () {
    $("#noteTitle").val("");
    $("#noteBody").val("");
}

function renderNoteList (noteList) {
    var noteTitle = $("#noteTitle");
    var noteBody = $("#noteBody");
    $("#buttonArea").empty();
    for (var i=0; i<noteList.length; i++) {
        var buttonEl = $("<button>");
        buttonEl.addClass("button is-primary");
        buttonEl.text(noteList[i]);
        buttonEl.addClass("noteButtons");
        buttonEl.attr("data-index", i);
        // buttonEl.on("click", loadNote(noteList,i));
        $("#buttonArea").append(buttonEl);
    }
    $(".noteButtons").on("click", loadNote);
}

function clearNotes () {
    for (var i=0; i<noteList.length; i++) {
        localStorage.removeItem(noteList[i]);
    }
    noteList=[];
    localStorage.removeItem("noteList");
    renderNoteList(noteList);
    newNote();
}

if (localStorage.getItem("noteList")) {
    noteList = JSON.parse(localStorage.getItem("noteList"));
}
renderNoteList(noteList);

$("#saveButton").on("click", saveNotes);
$("#clearButton").on("click", clearNotes);
$("#newButton").on("click", newNote);

// ===================================================================================


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

// ===================================================================================
 

function getJoke () {
//Set search parameters for jokes to exclude anything that is racist, sexist, or NSFW
//Set joke to be a two part
    var queryURL = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist,explicit&type=twopart";
    $.ajax({
        url: queryURL,
        method: "GET",
    })
        .then(function(response) {
            $("#jokeSetup").text(response.setup);
            $("#jokeDelivery").text(response.delivery);
        });
}

getJoke();


//=============================================================================================

//Code for fix of cross-origin error.
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

function getQuote () {
    var queryURL = "https://zenquotes.io/api/today";
    $.ajax({
        url: queryURL,
        method: "GET",
    })
//Also don't forget to add Zen Quote attribution to HTML!
        .then(function(response) {
//Response is a string, so we need to parse
            var res = JSON.parse(response);
            $("#qotdQ").text(res[0].q);
            $("#qotdA").text(res[0].a);
        });
}

getQuote();

//============================================================================================

var userPick;
var gifSearch = $(".userPick");
var gifKey = 0;

gifSearch.on("click", function () {
    userPick = $(".gifSearch").val();
    localStorage.setItem(gifKey, userPick);
    console.log(userPick);
    getGif();
})

function getGif() {
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&tag=" + userPick + "&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var gifBox = $(".gifBox");
        gifBox.empty();
        var imageUrl = response.data.image_original_url
        var randomGif = $("<img>");
        randomGif.attr("src", imageUrl);
        randomGif.attr("alt", userPick + " image");
        $("#gifBox").prepend(randomGif);
    })
}

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
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=" + apiKey

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var columnOne = $(".columnOne");
        var columnTwo = $(".columnTwo");
        var columnThree = $(".columnThree");
        columnOne.empty();
        columnTwo.empty();
        columnThree.empty();

        columnOne.append("<p>" + "<strong>" + (moment().format("M/DD/YY")) + "</strong>");
        columnOne.append("<img id='image1'>");
        $("#image1").attr("src", "http://openweathermap.org/img/wn/"+ response.list[0].weather[0].icon + ".png");
        columnOne.append("<p>" + "Temperature: " + response.list[0].main.temp + "</p>");
        columnOne.append("<p>" + "Humidity: " + response.list[0].main.humidity + "</p>");

        columnTwo.append("<p>" + "<strong>" + (moment().add(1, 'days').format("M/DD/YY")) + "</strong>");
        columnTwo.append("<img id='image2'>");
        $("#image2").attr("src", "http://openweathermap.org/img/wn/"+ response.list[1].weather[0].icon + ".png");
        columnTwo.append("<p>" + "Temperature: " + response.list[1].main.temp + "</p>");
        columnTwo.append("<p>" + "Humidity: " + response.list[1].main.humidity + "</p>");

        columnThree.append("<p>" + "<strong>" + (moment().add(2, 'days').format("M/DD/YY")) + "</strong>"); 
        columnThree.append("<img id='image3'>");
        $("#image3").attr("src", "http://openweathermap.org/img/wn/"+ response.list[2].weather[0].icon + ".png");
        columnThree.append("<p>" + "Temperature: " + response.list[2].main.temp + "</p>");
        columnThree.append("<p>" + "Humidity: " + response.list[2].main.humidity + "</p>");


    })
}

// ===================================================================================

var toggle = $(".toggle");

toggle.on("click", function () {
    document.body.classList.toggle("darkMode");
    // $(".tile").addClass("is-dark");
})