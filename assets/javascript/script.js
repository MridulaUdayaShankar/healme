var config = {
    apiKey: "AIzaSyB_iZRqtEui7Y9gws9Oh7iZmNfL8NdFnIU",
    authDomain: "fir-demo-demo.firebaseapp.com",
    databaseURL: "https://fir-demo-demo.firebaseio.com",
    projectId: "fir-demo-demo",
    storageBucket: "fir-demo-demo.appspot.com",
    messagingSenderId: "697278668685"
};

firebase.initializeApp(config);

const auth = firebase.auth();

const txtEmail = $("#txtEmail");
const txtPassword = $("#txtPassword");
const btnLogin = $("#btnLogin");
const btnSignUp = $("#btnSignup");
const btnLogout = $("#btnLogout");

btnSignUp.on("click", function(event) {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));

});

btnLogin.on("click", function(event) {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        // ...
    });

    // $(".box-search").slideToggle();

    // promise.catch(e => console.log(e.code));

});

btnLogout.on("click", function() {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();

    firebase.auth().signOut();

    $(".box-search").slideToggle();


    
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogin.attr("disabled", "disabled");
        btnSignUp.attr("disabled", "disabled");
        btnLogout.removeClass("d-none");
        $(".box-search").slideToggle();
        $("html, body").animate({ scrollTop: $('.box-search').offset().top }, 1000);
    } else {
        console.log("not logged in");
        btnLogout.addClass("d-none");
        btnLogin.removeAttr("disabled");
        btnSignUp.removeAttr("disabled");
    }
});

