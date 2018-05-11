function getLocation(){

  if (navigator.geolocation){
    console.log(navigator.geolocation.getCurrentPosition(betterDoctor));
  }else{
    console.log("Geolocation is not supported by this browser.");
  }

}


var betterDoctor = function(position){

  var key = "bc7f67f5ab920635890a971a98eac05e";

  var lat = position.coords.latitude.toFixed(3);

  var lng = position.coords.longitude.toFixed(3);

  var range = 100;

  var num = 10;

  var injury = "ankle strain";

  var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + injury + "location=" + lat + "," + lng + "," + range + "&skip=0&limit=" + num + "&user_key=" + key;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    console.log(response);

  });
}

getLocation();

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




