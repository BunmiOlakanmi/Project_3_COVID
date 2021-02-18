
// Streetmap Layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
	attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
	tileSize: 512,
	maxZoom: 18,
	zoomOffset: -1,
	id: "mapbox/streets-v11",
	accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	maxZoom: 18,
	id: "dark-v10",
	accessToken: API_KEY
});

// Create a baseMaps object
var baseMaps = {
	"Street Map": streetmap,
	"Dark Map": darkmap
};
  
///State Data
d3.json('/api_influenza').then(function(response) {
    var state = response.map(flu => flu.NAME);
    var lat = response.map(flu=>flu.LATITUDE);
    var long = response.map(flu=>flu.LONGITUDE);
    var covid_deaths = response.map(flu=>flu['COVID-19_Deaths']);
    var flu_deaths = response.map(flu=>flu.Pneumonia_Influenza_Deaths);
    var total_deaths = response.map(flu=>flu.Total_Deaths);
    coordinates = [lat, long];
	
    ///function to set markerSize on maps
	function markerSize(deaths) {
		return deaths * 5;
	}
	
	// Define arrays to hold created covid and influenza markers
	var COVIDDeathMarkers = [];
	var FluDeathMarkers = [];
	  
	  // Loop through locations and create covid and influenza markers
	for (var i = 0; i < state.length; i++) {
		var city = response[i];
		//console.log(city);
		coordinates=[,];
		coordinates[0]= city.LATITUDE;
		coordinates[1]= city.LONGITUDE;
		//console.log(coordinates);
		
		// Setting the marker radius for the state by passing deaths into the markerSize function
		COVIDDeathMarkers.push(
		  L.circle(coordinates, {
			stroke: false,
			fillOpacity: 0.75,
			color: "white",
			fillColor: "white",
			radius: markerSize(city['COVID-19_Deaths'])
		  })

		);
		

		// Setting the marker radius for the state by passing deaths into the markerSize function
		FluDeathMarkers.push(
		  L.circle(coordinates, {
			stroke: false,
			fillOpacity: 0.55,
			color: "purple",
			fillColor: "purple",
			radius: markerSize(city.Pneumonia_Influenza_Deaths)
		  })
		);

		
		// Create base layers		
	}
	
	// Create two separate layer groups: one for cities and one for states
	var covid = L.layerGroup(COVIDDeathMarkers);
	var flu = L.layerGroup(FluDeathMarkers);
	
	// Define a map object
	var myMap = L.map("map", {
		center: [39.011902, -98.484246],
		zoom: 5,
		layers: [streetmap, covid, flu]
	});
	
	// Create an overlay object
	var overlayMaps = {
		"COVID Deaths": covid,
		"Influenza Deaths": flu
	};
	
	// Pass our map layers into our layer control
	// Add the layer control to the map
	L.control.layers(baseMaps, overlayMaps, {
		collapsed: false
	}).addTo(myMap);
})