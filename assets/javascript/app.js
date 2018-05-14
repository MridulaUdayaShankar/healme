var config = {
    apiKey: "AIzaSyB_iZRqtEui7Y9gws9Oh7iZmNfL8NdFnIU",
    authDomain: "fir-demo-demo.firebaseapp.com",
    databaseURL: "https://fir-demo-demo.firebaseio.com",
    projectId: "fir-demo-demo",
    storageBucket: "fir-demo-demo.appspot.com",
    messagingSenderId: "697278668685"
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();

const txtEmail = $("#txtEmail");
const txtPassword = $("#txtPassword");
const btnLogin = $("#btnLogin");
const btnSignUp = $("#btnSignup");
const btnLogout = $("#btnLogout");

// Button Listener
$("#btn-submit").on("click", function() {
  // console.log("hello")
    event.preventDefault();

    getLocation();

    $('#pleaseWaitDialog').modal();
});

$("#btn-clear").on("click", function() {
  // console.log("bye")
  event.preventDefault();

  window.location.reload();

});


var getLocation = function(){

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(betterDoctor);
  }else{
    alert("Geolocation is not supported by this browser.");
  }

}


var betterDoctor = function(position){
  
  var key = "bc7f67f5ab920635890a971a98eac05e";

  var lat = position.coords.latitude.toFixed(3);

  var lng = position.coords.longitude.toFixed(3);

  var range = $("#search-input").val().trim();

  var num = $("#number-Of-Doc").val().trim();

  var injury = $("#input-symptoms").val().trim();

  var gender = $("#gender-input").val().trim();

  var sort = $("#sort-input").val().trim();

  var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + injury + "&location=" + lat + "," + lng + "," + range + "&user_location=" + lat + "," + lng +  "&skip=0&gender=" + gender + "&sort=" + sort + "&limit=" + num + "&user_key=" + key;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    // console.log(response);

    $('#pleaseWaitDialog').modal('hide');
    
    var searchResults = "";

    for(var i=0; i< response.meta.count; i++){
      // betterDoctorPractice(response.data[i].practices[0].visit_address.street, lat, lng, range, num, key, sort, response.meta.count)

        searchResults += "<tr><td>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + ", " + response.data[i].profile.title + "</td><td>" + response.data[i].specialties[0].description + "</td><td>" + response.data[i].practices[0].visit_address.street + " " + response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state +  " " + response.data[i].practices[0].visit_address.zip + "</td><td>" + response.data[i].practices[0].phones[0].number + "</td><td>" + response.data[i].practices[0].distance.toFixed(2) + "</td><td>" + response.data[i].practices[0].website + "</td></tr>";
        $("#table-list > tbody").append("<tr><td>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + ", " + response.data[i].profile.title + "</td><td>" + response.data[i].specialties[0].description + "</td><td>" + response.data[i].practices[0].visit_address.street + " " + response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state +  " " + response.data[i].practices[0].visit_address.zip + "</td><td>" + response.data[i].practices[0].phones[0].number + "</td><td>" + response.data[i].practices[0].distance.toFixed(2) + "</td><td>" + response.data[i].practices[0].website + "</td></tr>");

        firebase.auth().onAuthStateChanged(firebaseUser => {

            if(firebaseUser) {

                database.ref(firebaseUser.uid).update({
                    searchResults: searchResults
                });
            }

        });
    }
  
  });

    //Clears all of the text-boxes
  $("#input-symptoms").val("");
  $("#number-Of-Doc").val("");
  $("#search-input").val("");
  $("#sort-input").val("");
  $("#gender-input").val("");
}


// var googleMaps = function(){

//   var key = "AIzaSyCOBLdLofHakTbDCusqPvCHIFPp8kf8SvM"

//   var queryURL =

//    $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){

//     console.log(response);

//   });
// }





// var betterDoctorPractice = function (name, lat, lng, range, num, key, sort, count){
//   var queryURL = "https:api.betterdoctor.com/2016-03-01/practices?name=" + name + "&location=" + lat + "," + lng + "," + range + "user_location=" + lat + "," + lng + "&skip=0&limit=" + num + "&user_key=" +key + "&sort=" + sort;

//    $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){

//     console.log(response);

//     //  for(var i=0; i< response.meta.count; i++){
//     //   $("#table-list > tbody").append("<tr><td>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + ", " + response.data[i].profile.title + "</td><td>" + response.data[i].specialties[0].description + "</td><td>" + response.data[i].practices[0].visit_address.street + " " + response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state +  " " + response.data[i].practices[0].visit_address.zip + "</td><td>" + response.data[i].practices[0].phones[0].number + "</td><td>" + response.data[i].practices[0].distance.toFixed(2) + "</td><td>" + response.data[i].practices[0].website + "</td></tr>");
//     // }

//   });
// }

btnSignUp.on("click", function(event) {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        // ...
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {

        if(firebaseUser) {

            database.ref(firebaseUser.uid).set({
                email: firebaseUser.email
            });
        }

    });

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

    firebase.auth().onAuthStateChanged(firebaseUser => {

        if(firebaseUser) {

            database.ref(firebaseUser.uid).on("value", function(snapshot) {

                console.log("Welcome, " +snapshot.val().email);
                btnLogin.addClass("d-none");
                btnSignUp.addClass("d-none");
                btnLogout.removeClass("d-none");
                $(".box-email").hide();
                $(".box-password").hide();
                $(".box-search").slideToggle();

            });
        }

    });



});

btnLogout.on("click", function() {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();

    firebase.auth().signOut();

    $(".box-search").slideToggle();
    console.log("not logged in");
    btnLogout.addClass("d-none");
    btnLogin.removeClass("d-none");
    btnSignUp.removeClass("d-none");
    $(".box-email").show();
    $(".box-password").show();
    
});



