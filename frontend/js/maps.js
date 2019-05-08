function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

console.log("entra");
let caplatitude = 41.428997;
let caplongitude = 2.157353;
let latitude;
let longitude;
$("#getaddress").click(function() {
  $.ajax({
    url: "/phone-assistance/backend/selects/caps.php",
    type: "GET",
    cache: false,
    success: function(response) {
      console.log(response);
      let myJSON = JSON.parse(response);
      let address = $('#address').val();
      let minkm=1000;
      for (let i = 0; i < myJSON.length; i++) {
        myJSON[i].address;
        $.ajax({
          url: "https://eu1.locationiq.com/v1/search.php?key=31908d669a0b74&q=" + address + "&format=json",
          success: function(result) {
            latitude = result[0]["lat"];
            longitude = result[0]["lon"];
            let distance = getDistanceFromLatLonInKm(caplatitude, caplongitude, latitude, longitude);
            console.log(latitude);
            console.log(longitude);
            console.log("Distancia entre cap horta i punt: " + distance + " km");
          }
        });
      }



    },
    error: function() {
      console.log('No hi han clients');
    }
  });








});
