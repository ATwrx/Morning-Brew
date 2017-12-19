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
database.ref().set({
    user: name,
    email: email,
    age: age,
    comment: comment
});


