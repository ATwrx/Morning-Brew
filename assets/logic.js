
var config = {
    apiKey: "AIzaSyCXFygFxFj__zV1rdnnnRNyNQ7eiR8a5Mg",
    authDomain: "fresh-brew.firebaseapp.com",
    databaseURL: "https://fresh-brew.firebaseio.com",
    projectId: "fresh-brew",
    storageBucket: "",
    messagingSenderId: "29406706890"
};
firebase.initializeApp(config);
var database = firebase.database();

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
} else {
    // TODO: sign up modal
}


// User status listener
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
    }
});


// Button for the sign up page
$("#sign-up-button").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
})




