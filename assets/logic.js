const config = {
    apiKey: "AIzaSyCXFygFxFj__zV1rdnnnRNyNQ7eiR8a5Mg",
    authDomain: "fresh-brew.firebaseapp.com",
    databaseURL: "https://fresh-brew.firebaseio.com",
    projectId: "fresh-brew",
    storageBucket: "",
    messagingSenderId: "29406706890"
};
firebase.initializeApp(config);
const database = firebase.database();
const user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
const defaultModules = ["sports"]
if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
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
    //getDate()
    sports()
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
        for (i = 0; i < 5; i++) {
            let $div = $("<div>");
            let $br = $("<br>");
            let article = $div.html("<h3>" + r.articles[i].title + "</h3> <p>" + r.articles[i].description + "</p>")
            $(".modules-area").append(article);
        }
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

loadDefault()
