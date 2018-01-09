const config = {
    apiKey: "AIzaSyCXFygFxFj__zV1rdnnnRNyNQ7eiR8a5Mg",
    authDomain: "fresh-brew.firebaseapp.com",
    databaseURL: "https://fresh-brew.firebaseio.com",
    projectId: "fresh-brew",
    storageBucket: "",
    messagingSenderId: "29406706890"
};
firebase.initializeApp(config)
const database = firebase.database()
const user = firebase.auth().currentUser
var name, email, photoUrl, uid, emailVerified
const defaultModules = ["weather", "sports", "technews", "news", "crypto"]
if (user != null) {
    name = user.displayName
    email = user.email
    photoUrl = user.photoURL
    emailVerified = user.emailVerified
    uid = user.uid
    modules = user.modules
    loadModules()
} else {
    loadDefault()
}
// User status listener
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        topBarData()
    } else {
        return
    }
});
var modal = $(".modal")
var btn = $("#sign-in")
var span = $(".close")
btn.onclick = function() {
        modal.style.display = "block";
    }
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function loadDefault() {
    topBarData()
    for (let i = 0; i < defaultModules.length; i++) {
        let $div = $("<div>")
        $div.addClass(defaultModules[i])
        $div.addClass("module")
        $(".modules-area").append($div)
    }
    getWeather()
    sports()
    technews()
    news()
    crypto()
}

function loadModules() {
    topBarData()
    for (let i = 0; i < user.modules.length; i++) {
        let $div = $("<div>")
        $div.addClass(defaultModules[i])
        $div.addClass("module")
        $(".modules-area").append($div)
        }
    getWeather()
    sports()
    technew()
    news()
    crypto()
}
function topBarData() {
    startDate()
    startTime()
}

function startDate() {
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.getElementById("date").innerHTML = days[d.getDay()] + " " + [d.getMonth() + 1] + "/" + d.getDate() + "/" + d.getFullYear();
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var ampm = "";
    m = checkTime(m);
    if (h > 12) {
        h = h - 12;
        ampm = " PM";
    } else if (h == 12) {
        h = 12;
        ampm = " AM";
    } else if (h < 12) {
        ampm = " AM";
    } else {
        ampm = "PM";
    };
    if (h == 0) {
        h = 12;
    }
    document.getElementById('display').innerHTML = h + ":" + m + ampm;
    var t = setTimeout(function() {
        startTime()
    }, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

function getWeather() {
    let api = "https://fcc-weather-api.glitch.me/api/current?";
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let userLocation = {};
            userLocation.lat = position.coords.latitude;
            userLocation.lon = position.coords.longitude;
            $.ajax(api + $.param(userLocation)).done(function(r) {
                console.log(r)
                let icon = $("<img>");
                let description = $("<h5>").text(r.weather[0].description)
                let result = $("<h4>");
                let cTemp = r.main.temp;
                let fTemp = Math.floor(cTemp * 1.8 + 32);

                result.text("It's " + fTemp + " F in  " + r.name);
                $(".temp").text(fTemp + " F")
                icon.attr("src", r.weather[0].icon);
                icon.attr("alt", r.weather[0].description);
                $(".weather").prepend(result, icon, description)
            });
        })
    }
}

function sports() {
    let api = "https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=94d15b4fc0ea4ac8a2102b268ac422de";
    $.ajax(api).done(function(r) {
        //console.log(r.articles[0]);
        for (let i = 0; i < 5; i++) {
            let $div = $("<div>");
            $div.html("<h5 class='sports-title'><strong><a href='" + r.articles[i].url + "'style='font-size: 20px;'>" + r.articles[i].title + "</strong></a></h5><p class='sports-text'>" + r.articles[i].description + "</p>")
            $div.addClass("sports-article-" + i)
            if (i == 0) {
                $(".sports").append($div)
            } else {
                let prev = i - 1
                $(".sports-article-" + prev).append($div);
            }
        }
        let $h3 = $("<h3>").text("Sports News")
        $h3.addClass("module-title")
        $(".sports-article-0").prepend($h3)
    })
}

function technews() {
    let api = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=94d15b4fc0ea4ac8a2102b268ac422de";
    $.ajax(api).done(function(r) {
        console.log(r.articles[0]);
        let $h3 = $("<h3>").text("Tech News")
        $h3.addClass("module-title")
        $(".technews").append($h3)

        for (let i = 0; i < 3; i++) {
            let $div = $("<div>");
            $div.html("<h5 class='technews-title'><strong><a href='" + r.articles[i].url + "'style='font-size: 20px;'>" + r.articles[i].title + "</strong></a></h5><p class='technews-text'>" + r.articles[i].description + "</p>")
            $div.addClass("technews-article-" + i)
            if (i == 0) {
                $(".technews").append($div)
            } else {
                let prev = i - 1
                $(".technews-article-" + prev).append($div);
            }
        }
    })
}

function news() {
    let api = "https://newsapi.org/v2/top-headlines?sources=nbc-news&apiKey=94d15b4fc0ea4ac8a2102b268ac422de";
    $.ajax(api).done(function(r) {
        // console.log(r.articles[0]);
        let $h3 = $("<h3>").text("World News")
        $h3.addClass("module-title")
        $(".news").append($h3)

        for (let i = 0; i < 5; i++) {
            let $div = $("<div>");
            $div.html("<h5 class='news-title'><strong><a href='" + r.articles[i].url + "'style='font-size: 20px;'>" + r.articles[i].title + "</strong></a></h5><p class='news-text'>" + r.articles[i].description + "</p>")
            $div.addClass("news-article-" + i)
            if (i == 0) {
                $(".news").append($div)
            } else {
                let prev = i - 1
                $(".news-article-" + prev).append($div);
            }
        }
    })
}

function crypto() {
    let api = "https://api.coinmarketcap.com/v1/ticker/";
    let coin = "Bitcoin"
    $.ajax({
        url: api + coin + "/",
        success: function(r) {
            let thisCoin = r[0];
            let input = $("<input>")
            let btn = $("<button>")
            input.attr({
                value: "Bitcoin",
                type: "text",
                id: "coin-input",
            })
            input.addClass("inline")
            btn.addClass("inline button button-small primary")
            btn.attr({
                value: "Search",
                id: "coin-submit"
            })
            btn.text("Search")
            $(".crypto").html("<div class='coin-info'><h4>" + thisCoin.name + " (" + thisCoin.symbol + ") </h4><h5>Current Price (USD): " + thisCoin.price_usd + "</h5></div>");
            //$(".crypto").append(input, btn)
        },
        error: function() {
            $(".crypto").html("<h2>An error occured.</h2><h4> Is the name of the coin spelled correctly?</h4>")
        }
    })
/*    $(document).on("click", "#coin-submit", function() {*/
        //let newCoin = $("#coin-input").val()
        //let api = "https://api.coinmarketcap.com/v1/ticker/";
        //$.ajax({
            //url: api + newCoin + "/"
            //success: function(r){
                //let thisCoin = r.[0]
                //$(".coin-info").html("<div class='coin-info'><h4>" + thisCoin.name + " (" + thisCoin.symbol + ") </h4><h5>Current Price (USD): " + thisCoin.price_usd + "</h5></div>");

            //}
        //})
    /*})*/
}

// Button for the sign up page
$("#sign-up-button").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).
    catch (function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    })
})

