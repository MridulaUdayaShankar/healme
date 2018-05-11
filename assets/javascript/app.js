// Button Listener
$("#btn-submit").on("click", function() {
  console.log("hello")
  event.preventDefault();

  // Grab user input
  var distanceFrom  = $("#input-symptoms").val().trim();
  var displayList = $("#number-Of-Doc").val().trim();
  var injuryEvent = $("#search-input").val().trim();
  var sortPreference = $("#sort-input").val().trim();
  var doctorGender = $("#gender-input").val().trim();

  // Translate Option Menus to Text
  if(doctorGender === 1){
    doctorGender = "male";
  }else if(doctorGender === 2){
    doctorGender = "female";
  }

  if(sortPreference === 1){
    sortPreference = "best-match-desc";
  }else if(sortPreference === 2){
    sortPreference = "rating-desc";
  }else if(sortPreference === 3){
    sortPreference = "distance-asc";
  }

  // Creates local "temporary" object for holding user data
  var newUser = {
    radar: distanceFrom,
    num: displayList,
    illness: injuryEvent,
    sort: sortPreference,
    gender: doctorGender
  };
 
  // Logs everything to console
  console.log(newUser.radar);
  console.log(newUser.num);
  console.log(newUser.illness);
  console.log(newUser.sort);
  console.log(newUser.gender);
  
  getLocation();

  // Clears all of the text-boxes
  $("#input-symptoms").val("");
  $("#number-Of-Doc").val("");
  $("#search-input").val("");
  $("#sort-input").val("");
  $("#gender-input").val("");


});


function getLocation(){

  if (navigator.geolocation){
    console.log(navigator.geolocation.getCurrentPosition(betterDoctor));
  }else{
    console.log("Geolocation is not supported by this browser.");
  }

}


var betterDoctor = function(position){
  
  var sortPreference = $("#sort-input").val().trim();
  var doctorGender = $("#gender-input").val().trim();

  var genderDoc = "";

  var sortDoc = "";

  if(doctorGender === 1){
    genderDoc = "male";
  }else if(doctorGender === 2){
    genderDoc = "female";
  }

  if(sortPreference === 1){
    sortDoc  = "best-match-desc";
  }else if(sortPreference === 2){
    sortDoc  = "rating-desc";
  }else if(sortPreference === 3){
    sortDoc  = "distance-asc";
  }


  var key = "bc7f67f5ab920635890a971a98eac05e";

  var lat = position.coords.latitude.toFixed(3);

  var lng = position.coords.longitude.toFixed(3);

  var range = $("#search-input").val().trim();

  var num = $("#number-Of-Doc").val().trim();

  var injury = $("#input-symptoms").val().trim();

  var gender = genderDoc;

  var sort = sortDoc;

  var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + injury + "&location=" + lat + "," + lng + "," + range + "&skip=0&gender=" + gender + "&sort=" + sort + "&limit=" + num + "&user_key=" + key;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);

    var specArr = [];
    var insuArr = [];
    var practArr = [];
    var phoneArr = [];
    var specs = [];
    var ins = [];
    var loc = [];
    var tel = [];

    for(var i =0; i< response.length ; i++){
      //Loop through specialties
      for(var j =0; j < response.data[i].specialties.length; j++){
        specArr.push(response.data[i].specialties[j].description)
      }
      specs[i] = specArr.concat(', ')

      //Loop through insurances
      for(var k =0; k< response.data[i].insurances.length; k++){
        insuArr.push(response.data[i].insurances[k].insurance_plan.name)
      }
      ins[i] = insuArr.concat(', ')

      //Loop through practices
      for(var z =0; z< response.data[i].practices.length; z++){
        practArr.push(response.data[i].practices[z].steet + " " + response.data[i].practices[z].city + ", " + response.data[i].practices[z].state)
      }
      loc[i] = practArr.concat(', ')

      //Loop through practices
      for(var y =0; y< response.data[i].phones.length; y++){
        practArr.push(response.data[i].phones[y].number)
      }
      tels[i] = practArr.concat(', ')

      $("#table-list > tbody").append("<tr><td>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + ", " + response.data[i].profile.title + "</td><td>" + specs[i] + "</td><td>" +
      ins[i] + "</td><td>" + loc[i] + "</td><td>" + tels[i] + "</td></tr>");
    }

  });
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






//   var queryURL =

//    $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){

//     console.log(response);

//   });
// }




