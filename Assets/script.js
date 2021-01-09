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

var noteList;

function saveNotes (event) {
    event.preventDefault();
    var noteTitle = $("#noteTitle");
    var noteBody = $("#noteBody");
    noteList = [];
    if (localStorage.getItem("noteList")) {
        noteList = JSON.parse(localStorage.getItem("noteList"));
    }
    if (!noteList.includes(noteTitle.val())) {
        noteList.push(noteTitle.val());
        console.log(noteList);
        localStorage.setItem("noteList",JSON.stringify(noteList));
        localStorage.setItem(noteTitle.val(),noteBody.val());
    }
    console.log(noteList);
    renderNoteList(noteList);
    $("button").on("click", loadNote);
}

function loadNote (event) {
    console.log("hi");
    var i = $(this).data("index");
    var noteTitle = $("#noteTitle");
    var noteBody = $("#noteBody");
    noteTitle.val(noteList[i]);
    console.log(noteList[i]);
    console.log(localStorage.getItem(noteList[i]));
    noteBody.val(localStorage.getItem(noteList[i]));
}

function renderNoteList (noteList) {
    console.log(noteList);
    var noteTitle = $("#noteTitle");
    var noteBody = $("#noteBody");
    for (var i=0; i<noteList.length; i++) {
        var buttonEl = $("<button>");
        buttonEl.addClass("button is-primary");
        buttonEl.text(noteList[i]);
        buttonEl.addClass("noteButtons");
        buttonEl.attr("data-index", i);
        // buttonEl.on("click", loadNote(noteList,i));
        $("#buttonArea").append(buttonEl);
    }
}

$("#saveButton").on("click", saveNotes);

var hyperlink = $(".hyperlink");
var link = [
    "https://https://www.w3schools.com/",
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
