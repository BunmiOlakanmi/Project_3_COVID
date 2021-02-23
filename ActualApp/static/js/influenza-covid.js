// var Datas =d3.json('/api_covid_infection')

// console.log(Datas)

function popups(){
     
  document.getElementById('map-container').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

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

    // console.log(response);
    // console.log(state);
    // console.log(state.length)
    // console.log(lat);
    // console.log(long);
    // console.log(coordinates);
    // console.log(covid_deaths);
    // console.log(flu_deaths);
    // console.log(total_deaths);






    // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
    for (var i = 0; i < state.length; i++) {
    var city = response[i];
    // console.log(city);
    coordinates=[,];
    coordinates[0]= city.LATITUDE;
    coordinates[1]= city.LONGITUDE;
    // console.log(coordinates);
    L.marker(coordinates)
      .bindPopup("<h1>" + city.NAME + "</h1> <hr> <h3>Total Deaths " + city.Total_Deaths+ "</h3>" + "</h1>  <h3>Total COVID 19 Deaths " + city['COVID-19_Deaths']+ "</h3>"+ "</h1> <h3>Total Influenza Deaths " + city.Pneumonia_Influenza_Deaths+ "</h3>" )
      .addTo(myMap);
    }
    });

  
}


function markercircles(){
  document.getElementById('map-container').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

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
}



function optionChanged(selectedData){
  if (selectedData =="Aggregate Deaths"){
    d3.select("#bar").selectAll("svg").remove()
    var panel = d3.select("#bar-plot");
    panel.html("");
  
    popups();
  } 
  else if (selectedData =="Influenza vs COVID-19 Deaths"){
    d3.select("#bar").selectAll("svg").remove()
    var panel = d3.select("#bar-plot");
    
    panel.html("");
    markercircles();
  }

  
}

function init() {
  document.getElementById('map-container').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
  
  d3.json('/api_influenza').then(function(response){
    var state = response.map(flu => flu.NAME);
    var total_deaths = response.map(flu=>flu.Total_Deaths);

    // console.log("working")
    console.log((state));
    console.log(total_deaths);

    // Create the Trace
    var trace = [{
      x: state,
      y: total_deaths,
      type: 'bar'
    }];

    // Create the data array for the plot
    var data = trace;


    // Define the plot layout
    var layout = {
      title: "Deaths by State",
      xaxis: { title: "State in the US" },
      yaxis: { title: "Total Deaths" }
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar-plot", data, layout);

  });



  var dropdownValues= ['Total Deaths', "Aggregate Deaths", "Influenza vs COVID-19 Deaths"];
  var dropdownMenu = d3.select("#selDataset");
  dropdownValues.forEach((sample)=>{
    dropdownMenu.append("option")
    .text(sample)
    .property("value", sample);
  })
}

init();



