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

    const promise = auth.signInWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));

});

btnLogout.on("click", function() {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();

    firebase.auth().signOut();
    
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogout.removeClass("hide");
    } else {
        console.log("not logged in");
        btnLogout.addClass("hide");
    }
});

// auth.signWithEmailAndPassword(email, pass);

// auth.createUserWithEmailAndPassword(email, pass);

// auth.onAuthStateChanged(firebaseUser =>{});