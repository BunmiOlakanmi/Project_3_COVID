//Create a map object
var myMap = L.map("map", {
    center: [39.011902, -98.484246],
    zoom: 3
  });

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


///State Data

d3.json('/api_influenza').then(function(response) {
  
  var state = response.map(flu => flu.NAME);
  var lat = response.map(flu=>flu.LATITUDE);
  var long = response.map(flu=>flu.LONGITUDE);
  var covid_deaths = response.map(flu=>flu['COVID-19_Deaths']);
  var flu_deaths = response.map(flu=>flu.Pneumonia_Influenza_Deaths);
  var total_deaths = response.map(flu=>flu.Total_Deaths);
  coordinates = [lat, long];

  console.log(response);
  console.log(state);
  console.log(state.length)
  console.log(lat);
  console.log(long);
  console.log(coordinates);
  console.log(covid_deaths);
  console.log(flu_deaths);
  console.log(total_deaths);



 
 

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < state.length; i++) {
  var city = response[i];
  console.log(city);
  coordinates=[,];
  coordinates[0]= city.LATITUDE;
  coordinates[1]= city.LONGITUDE;
  console.log(coordinates);
  L.marker(coordinates)
    .bindPopup("<h1>" + city.NAME + "</h1> <hr> <h3>Total Deaths " + city.Total_Deaths+ "</h3>" + "</h1>  <h3>Total COVID 19 Deaths " + city['COVID-19_Deaths']+ "</h3>"+ "</h1> <h3>Total Influenza Deaths " + city.Pneumonia_Influenza_Deaths+ "</h3>" )
    .addTo(myMap);
}
});