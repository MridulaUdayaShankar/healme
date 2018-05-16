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

  var range = $("#search-input").val();

  var num = $("#number-Of-Doc").val();

  var injury = $("#input-symptoms").val().trim();

  var gender = $("#gender-input").val();

  var sort = $("#sort-input").val();

  var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + injury + "&location=" + lat + "," + lng + "," + range + "&user_location=" + lat + "," + lng +  "&skip=0&gender=" + gender + "&sort=" + sort + "&user_key=" + key;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // console.log(response);

        audio.pause();

        $('#pleaseWaitDialog').modal('hide');

        var searchResults = "";

        for(var j=0; j< response.meta.count; j++){

        var filteredElem = response.data[j].practices.filter(function(element){
            return element.accepts_new_patients && element.within_search_area
        })

        console.log(filteredElem)

        // Validating the website value, to prevent showing undefined
        var practicesWebsite = filteredElem.filter(function(element){
            return element.website !== "undefined";
        })

        var practicesPhones = practicesWebsite.phones.filter(function(element){
            return element.type === "landline";
        })


        // if (typeof filteredElem.website === "undefined" || response.data[i].practices[0].website === null) {
        //         website = "-----";
        //     } else {
        //         website = "<a href='" + response.data[i].practices[0].website + "' target='_blank'>Access here</a>";
        //     }

        //     //Validating the phone number, putting a mask on it, to show it better (999)-999-9999 and also making in to show only landline numbers, not faxes
        //     var number = "No number";
        //     var numberFormatted = parseInt(response.data[i].practices[0].phones[0].number);

        //     if (response.data[i].practices[0].phones[0].type == "landline") {
        //         number = formatPhoneNumber(numberFormatted);
        //         number = "<a href='tel:" + numberFormatted + "'>" + number + "</a>";
        //     }else{
        //         number = "-----";
        //     }

        //     //Validate Specialty Description Text
        //     var specialties = null;
        //     if (typeof response.data[i].specialties[0].description === "undefined" || response.data[i].specialties[0].description === null) {
        //         specialties = "-----";
        //     } else {
        //         specialties = response.data[i].specialties[0].description;
        //     }

        // }


        for (var i = 0; i < num-1 ; i++) {

        // var filteredElem = response.data[i].practices.filter(function(element){
        //     return element.accepts_new_patients && element.within_search_area
        // })

        // console.log(filteredElem)

            // // Validating the website value, to prevent showing undefined
            // var website = null;
            // if (typeof response.data[i].practices[0].website === "undefined" || response.data[i].practices[0].website === null) {
            //     website = "-----";
            // } else {
            //     website = "<a href='" + response.data[i].practices[0].website + "' target='_blank'>Access here</a>";
            // }

            // //Validating the phone number, putting a mask on it, to show it better (999)-999-9999 and also making in to show only landline numbers, not faxes
            // var number = "No number";
            // var numberFormatted = parseInt(response.data[i].practices[0].phones[0].number);

            // if (response.data[i].practices[0].phones[0].type == "landline") {
            //     number = formatPhoneNumber(numberFormatted);
            //     number = "<a href='tel:" + numberFormatted + "'>" + number + "</a>";
            // }else{
            //     number = "-----";
            // }

            // //Validate Specialty Description Text
            // var specialties = null;
            // if (typeof response.data[i].specialties[0].description === "undefined" || response.data[i].specialties[0].description === null) {
            //     specialties = "-----";
            // } else {
            //     specialties = response.data[i].specialties[0].description;
            // }

            // Formatting the address so the link can point straight to Google Maps, showing the directions to the doctor's place
            //TODO: Change the location API to Geolocation after presentation
            var location = "<a target='_blank' href='https://www.google.com/maps/dir/?api=1&origin=" + lat + "," + lng + "&destination=" + response.data[i].practices[0].lat + "," + response.data[i].practices[0].lon + "'>" + response.data[i].practices[0].visit_address.street + " " + response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state + " " + response.data[i].practices[0].visit_address.zip + "</a>";

            searchResults += "<tr><td>" + practicesPhones.data[i].profile.first_name + " " + practicesPhones.data[i].profile.last_name + ", " + practicesPhones.data[i].profile.title + "</td><td>" + "" + "</td><td>" + location + "</td><td>" +  + "</td><td>" + practicesPhones.data[i].practices[0].distance.toFixed(2) + "</td><td>" + practicesWebsite.website + "</td></tr>";

            $("#table-list > tbody").append("<tr><td>" + practicesPhones.data[i].profile.first_name + " " + practicesPhones.data[i].profile.last_name + ", " + practicesPhones.data[i].profile.title + "</td><td>" + "" + "</td><td>" + location + "</td><td>" +  + "</td><td>" + practicesPhones.data[i].practices[0].distance.toFixed(2) + "</td><td>" + practicesWebsite.website + "</td></tr>");

            firebase.auth().onAuthStateChanged(firebaseUser => {

                if (firebaseUser) {

                    database.ref(firebaseUser.uid).update({
                        injury: injury,
                        num: num,
                        gender: gender,
                        range: range,
                        searchResults: searchResults
                    });
                }

            });
        }

    }

    //Clears all of the text-boxes
  $("#input-symptoms").val("");
  $("#number-Of-Doc").val("");
  $("#search-input").val("");
  $("#sort-input").val("");
  $("#gender-input").val("");
})


btnSignUp.on("click", function(event) {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        switch(errorCode) {

            case "auth/email-already-in-use":

                $.prompt("Sorry! There is already an user with this e-mail!");
                $("#txtEmail").val("");
                $("#txtPassword").val("");

            case "auth/invalid-email":

                $.prompt("Please use a valid e-mail");
                $("#txtEmail").val("");
                $("#txtPassword").val("");
        }

    });

    firebase.auth().onAuthStateChanged(firebaseUser => {

        if(firebaseUser) {

            database.ref(firebaseUser.uid).set({
                email: firebaseUser.email
            });

            $.prompt("Welcome, " +firebaseUser.email+"!");
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

        switch(errorCode) {

            case "auth/wrong-password":

                $.prompt("Wrong password. Please try again.");
                $("#txtEmail").val("");
                $("#txtPassword").val("");

            case "auth/user-not-found":

                $.prompt("No users with this email were found.");
                $("#txtEmail").val("");
                $("#txtPassword").val("");
        }
    });
});

btnLogout.on("click", function() {

    event.preventDefault();

    const email = txtEmail.val();
    const pass = txtPassword.val();

    firebase.auth().signOut();

    $(".box-search").slideToggle();
    
});

// Whenever a Firebase Authentication is changed (either with logging in or signing up, the if statement happens
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        btnLogin.addClass("d-none");
        btnSignUp.addClass("d-none");
        btnLogout.removeClass("d-none");
        $(".box-email").hide();
        $(".box-password").hide();
        $(".box-search").slideToggle();
        var welcome = $("<h3>");
        welcome.text("Greetings, " +firebaseUser.email+"!");
        welcome.addClass("welcome");
        $(welcome).insertBefore("#btnLogout");

        var lastSearch = "";

        // Getting data from Firebase database
        database.ref(firebaseUser.uid).on("value", function(snapshot) {

            if (typeof snapshot.val().searchResults !== "undefined") {

                lastSearch = "Your last search was about <b>" +snapshot.val().injury + "</b>, maximum number of <b>"+snapshot.val().num +"</b> doctors, all <b>"+ snapshot.val().gender +"</b> within <b>"+ snapshot.val().range +"</b> miles.";

                var last = $("<p>");
                last.addClass("last");
                last.html(lastSearch);

                last.insertBefore("#btnLogout");

                var buttonLast = $("<button>");
                buttonLast.addClass("btn btn-success btnLastResult");
                buttonLast.attr("type", "button");

                buttonLast.text("See results for the last search");
                buttonLast.insertBefore($("#btnLogout"));
                $("<br><br>").insertBefore($("#btnLogout"));

                $(document).on("click", ".btnLastResult", function () {

                    $("tbody").html();
                    $("tbody").html(snapshot.val().searchResults);

                });

            }

            // If any errors are experienced, log them to console.
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        $.prompt("Welcome back, " +firebaseUser.email+"!");

    } else {
        btnLogout.addClass("d-none");
        btnLogin.removeClass("d-none");
        btnSignUp.removeClass("d-none");
        $(".box-email").show();
        $(".box-password").show();
        $(".welcome").remove();
        $(".last").remove();
        $(".btnLastResult").remove();

    }
});

function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}



