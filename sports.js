export function sports() {
    let api = "https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=94d15b4fc0ea4ac8a2102b268ac422de";
    $.ajax(api).done(function(r) {
        //console.log(r.articles[0]);
        for (i = 0; i < 5; i++) {
            let $div = $("<div>");
            let $br = $("<br>");
            let article = $div.html("<h3>" + r.articles[i].title + "</h3> <p>" + r.articles[i].description + "</p>")
            $(".module-body").append(article);

        }
    }
}
