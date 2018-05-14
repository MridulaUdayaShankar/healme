// Button Listener
$("#btn-submit").on("click", function() {
  // console.log("hello")
  event.preventDefault();

  getLocation();

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

    for(var i=0; i< response.meta.count; i++){
      // betterDoctorPractice(response.data[i].practices[0].visit_address.street, lat, lng, range, num, key, sort, response.meta.count)
      $("#table-list > tbody").append("<tr><td>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + ", " + response.data[i].profile.title + "</td><td>" + response.data[i].specialties[0].description + "</td><td>" + response.data[i].practices[0].visit_address.street + " " + response.data[i].practices[0].visit_address.city + ", " + response.data[i].practices[0].visit_address.state +  " " + response.data[i].practices[0].visit_address.zip + "</td><td>" + response.data[i].practices[0].phones[0].number + "</td><td>" + response.data[i].practices[0].distance.toFixed(2) + "</td><td>" + response.data[i].practices[0].website + "</td></tr>");
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




