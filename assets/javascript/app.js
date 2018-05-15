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

var audio = new Audio('assets/images/bossanova.mp3');


// Button Listener
$("#btn-submit").on("click", function() {
  // console.log("hello")
    event.preventDefault();

    getLocation();

    audio.play();

    $('#pleaseWaitDialog').modal();
});

$("#btn-clear").on("click", function() {
  // console.log("bye")
  event.preventDefault();

  window.location.reload();

});


var getLocation = function(){

  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(betterDoctor);
  // }else{
  //   alert("Geolocation is not supported by this browser.");
  // }

  $.get("https://freegeoip.net/json/", function(res){
      betterDoctor(res);
  }, "jsonp");

}


var betterDoctor = function(position){
  
  var key = "bc7f67f5ab920635890a971a98eac05e";

  var lat = position.latitude.toFixed(3);

  var lng = position.longitude.toFixed(3);

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

    console.log(response);

    audio.pause();

    $('#pleaseWaitDialog').modal('hide');
    
    var searchResults = "";

    for(var i=0; i< response.meta.count; i++){

        // Validating the website value, to prevent showing undefined
        var website = null;
        if(typeof response.data[i].practices[0].website === "undefined" || response.data[i].practices[0].website === null) {
            website = "-----";
        } else {
            website = "<a href='"+response.data[i].practices[0].website+"' target='_blank'>Access here</a>";
        }

        //Validating the phone number, putting a mask on it, to show it better (999)-999-9999 and also making in to show only landline numbers, not faxes
        var number = "No number";
        var numberFormatted = parseInt(response.data[i].practices[0].phones[0].number);

        if(response.data[i].practices[0].phones[0].type == "landline") {
            number = formatPhoneNumber(numberFormatted);
            number = "<a href='tel:"+numberFormatted+"'>"+number+"</a>";
        }
        //https://www.google.com/maps/dir/?api=1&origin=47.5951518,-122.3316393&destination=37.65317,-120.9744
        var location = "<a target='_blank' href='https://www.google.com/maps/dir/?api=1&origin="+lat+","+lng+"&destination="+response.data[i].practices[0].lat+","+response.data[i].practices[0].lon+"'>"+ response.data[i].practices[0].visit_address.street + " " + response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state +  " " + response.data[i].practices[0].visit_address.zip +"</a>";

        searchResults += "<tr><td>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + ", " + response.data[i].profile.title + "</td><td>" + response.data[i].specialties[0].description + "</td><td>"+location+"</td><td>" + number + "</td><td>" + response.data[i].practices[0].distance.toFixed(2) + "</td><td>" + website + "</td></tr>";

        $("#table-list > tbody").append("<tr><td>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + ", " + response.data[i].profile.title + "</td><td>" + response.data[i].specialties[0].description + "</td><td>" + location + "</td><td>" + number + "</td><td>" + response.data[i].practices[0].distance.toFixed(2) + "</td><td>" + website + "</td></tr>");

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
                // btnLogin.addClass("d-none");
                // btnSignUp.addClass("d-none");
                // btnLogout.removeClass("d-none");
                // $(".box-email").hide();
                // $(".box-password").hide();
                // $(".box-search").slideToggle();

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
    // console.log("not logged in");
    // btnLogout.addClass("d-none");
    // btnLogin.removeClass("d-none");
    // btnSignUp.removeClass("d-none");
    // $(".box-email").show();
    // $(".box-password").show();
    
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {	+
        // console.log(firebaseUser);
            btnLogin.addClass("d-none");
        btnSignUp.addClass("d-none");
        btnLogout.removeClass("d-none");
        $(".box-email").hide();
        $(".box-password").hide();
        $(".box-search").slideToggle();
        $("html, body").animate({ scrollTop: $('.box-search').offset().top }, 1000);
    } else {
        console.log("not logged in");
        btnLogout.addClass("d-none");
        btnLogin.removeClass("d-none");
        btnSignUp.removeClass("d-none");
        $(".box-email").show();
        $(".box-password").show();
    }
});

function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}



