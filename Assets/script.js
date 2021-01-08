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