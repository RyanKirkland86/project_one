# Coding Homepage

## Summary

<br>
An all-in-one homepage that keeps window management to a minimum. Site includes commonly used reference links, live weather forecasting by location, a note taking section that can save notes to local storage, top tech news in a Bootstrap carousel, an inspiring quote of the day, a random joke to make you smile, quick random GIF search by topic, and a YouTube link to a playlist of relevant videos.
<br>

## Site Picture

![Site](https://github.com/michaelanthonyyy/project_one/blob/main/Assets/Images/screenshot.png)

<br>
<br>

## What Was Done

<br>
Using javascript, html, css, bulma, jquery, animate.css, bootstrap and moment, we created an all-in-one homepage for coders and coding enthusiasts. The purpose
 of the site was to provide coders with a one-stop-shop for all their needs to cut down on the tab bloat that normally arises when coding. We used bulma and html to set up the layout of the page, javascript to query different APIs, animate.css and bootstrap to enhance our site visually, and moment for the weather app.
<br>
<br>

## Code Snippets
```javascript
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
```
<br>
The ajax call needed the https://cors-anywhere.herokuapp.com/  as a prefilter. This URL acts as a proxy server for the request to prevent cross origin errors.
<br>
<br>

```javascript
function renderNews () {
    var queryURL = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=rBdT9Ta3VCBY52rY43X4LfdNrg58vknE";
    $.ajax({
        url: queryURL,
        method: "GET",
      })
        .then(function(response) {
            // This logic is to randomly select a news story, and make sure it hasn't been selected already.
            var randResultsList = [];
            for (var i=0; i<3; i++) {
                index = Math.floor(Math.random()*response.num_results);
                while (randResultsList.includes(index)) {
                    index = Math.floor(Math.random()*response.num_results);
                }
                randResultsList.push(index);
                // Populate fields
                $("#articleTitle"+(i+1)).text(response.results[index].title);
                $("#articleTitle"+(i+1)).attr("href", response.results[index].url);
                $("#articlePreview"+(i+1)).attr("src", response.results[index].multimedia[0].url);
                $("#previewLink"+(i+1)).attr("href", response.results[index].multimedia[0].url);
                $("#articleContent"+(i+1)).text(response.results[index].abstract);
            }    
    });
}
```
<br>
News API call and function to generate random indices after the response is received.
<br>
<br>

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Bulma](https://bulma.io/)
* [JQUERY](https://https://jquery.com/)
* [Animate.css](https://animate.style/)
* [Bootstrap](https://getbootstrap.com)
* [Moment](https://momentjs.com/docs/)

<br>
<br>

## Deployed Link

[Live Link "Programmer Homepage"](https://michaelanthonyyy.github.io/project_one/)

<br>

## Authors

**Michael Medina** 
- [Link to Github](https://github.com/michaelanthonyyy)
- [Link to LinkedIn](www.linkedin.com/in/michaelanthonyy)

**Ryan Kirkland** 
- [Link to Github](https://github.com/RyanKirkland86)
- [Link to LinkedIn](https://www.linkedin.com/in/ryan-kirkland-619942200/)

**James Merges** 
- [Link to Github](https://github.com/jmerges)
- [Link to LinkedIn](https://www.linkedin.com/in/james-merges-b938401b7/)

<br>

## License
The MIT License (MIT)