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
const defaultModules = ["sports", "technews", "bar"]
if (user != null) {
    name = user.displayName
    email = user.email
    photoUrl = user.photoURL
    emailVerified = user.emailVerified
    uid = user.uid
} else {
    loadDefault()
}
// User status listener
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
    }
});

function loadDefault() {
    getWeather()
    getDate()
    for (let i = 0; i < defaultModules.length; i++) {
        let $div = $("<div>")
        $div.addClass(defaultModules[i])
        $div.addClass("module")
        $(".modules-area").append($div)
    }
    sports()
    technews()
}

function getDate() {
    let today = new Date().toDateString()
    let time = new Date().toTimeString()
    $(".date").text(today + " " + time)
}

function getWeather() {
    let api = "https://fcc-weather-api.glitch.me/api/current?";

    function showPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let userLocation = {};
                userLocation.lat = position.coords.latitude;
                userLocation.lon = position.coords.longitude;
                $.ajax(api + $.param(userLocation)).done(function(r) {
                    let icon = $("<img>");
                    let result = $("<h4>");
                    let cTemp = r.main.temp;
                    let fTemp = Math.floor(cTemp * 1.8 + 32);
                    let isCelsius = true;

                    result.text(fTemp);
                    icon.attr("src", r.weather[0].icon);
                    icon.attr("alt", r.weather[0].description);
                    result.text(r.weather[0].main);

                    $(".weather").append(result, icon)
                    $(".temp").click(function() {
                        if (isCelsius == true) {
                            tempArea.text(fTemp);
                            $("#f-temp").addClass("active");
                            $("#c-temp").removeClass("active");
                            isCelsius = false;
                            return isCelsius;
                        } else {
                            tempArea.text(cTemp);
                            $("#c-temp").addClass("active");
                            $("#f-temp").removeClass("active");
                            isCelsius = true;
                            return isCelsius;
                        };
                    });
                });
            });
        } else {
            $("#noGeo").text("Your browser doesn't support Geolocation!");
        }
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
        for (let i = 0; i < 5; i++) {
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
        let $h3 = $("<h3>").text("Tech News")
        $h3.addClass("module-title")
        $(".technews-article-0").prepend($h3)
    })
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

