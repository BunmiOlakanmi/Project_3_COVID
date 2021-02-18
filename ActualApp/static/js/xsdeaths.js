function pietotaldeaths(){
    d3.json("/api_excessdeaths").then(function(response){
      var country = response.map(covid=>covid.Country);
      var deaths = response.map(covid=>covid.deaths);
      // console.log(country);
      
      var totaldeathsdata = [{
        values: totaldeaths,
        labels: country,
        //domain: {column: 0},
        name: 'Total Deaths',
        hoverinfo: 'labels + values + name',
        textinfo: 'none',
        hole: .4,
        type: 'pie'
      }];
  
      var totaldeathsLayout = {
        title: 'Excess deaths due to COVID-19 by Country',
        annotations: 
          {
            font: {
            size: 20
          },
            showarrow: false,
          text: 'COVID-19',
          x: 0.17,
          y: 0.5
        }
      };
    Plotly.newPlot("pie", totaldeathsdata, totaldeathsLayout);
    });
  }
  
  
  function pieexpecteddeaths(){
    d3.json("/api_excessdeaths").then(function(response){
      var country = response.map(covid=>covid.Country);
      var totalexpecteddeaths = response.map(covid=>covid.expected_deaths);
      // console.log(country);
     
      var totalExpectedDeaths = [{
        values: totalDeaths,
        labels: country,
        //domain: {column: 0},
        name: 'Total Expected Deaths',
        hoverinfo: 'labels + values + name',
        textinfo: 'none',
        hole: .4,
        type: 'pie'
      }];
  
      var totalExpectedDeathsLayout = {
        title: 'Excess deaths due to COVID-19 by Country',
        annotations: 
          {
            font: {
            size: 20
          },
            showarrow: false,
          text: 'COVID-19',
          x: 0.17,
          y: 0.5
        }
      };
    Plotly.newPlot("pie", totalExpectedDeaths, totalExpectedDeathsLayout);
    });
  }
  
  
  function pieexcessdeaths(){
    d3.json("/api_excessdeaths").then(function(response){
      var country = response.map(covid=>covid.Country);
      var excessdeaths = response.map(covid=>covid.excess_deaths);
      // console.log(country);
      
      var excessdeathsData = [{
        values: activeCases,
        labels: country,
        //domain: {column: 0},
        name: 'Active Cases',
        hoverinfo: 'labels + values + name',
        textinfo: 'none',
        hole: .4,
        type: 'pie'
      }];
  
      var excessdeathsLayout = {
        title: 'Excess deaths due to COVID-19 by Country',
        annotations: 
          {
            font: {
            size: 20
          },
            showarrow: false,
          text: 'COVID-19',
          x: 0.17,
          y: 0.5
        }
      };
    Plotly.newPlot("pie", excessdeathssData, excessdeathsLayout);
    });
  }
  
  
  
  
  function optionChanged(selectedData){
    if (selectedData =="Total Deaths"){
      var panel = d3.select("#pie");
      panel.html("");
      pietotaldeaths();
    } 
    else if (selectedData =="Expected Deaths"){
      var panel = d3.select("#pie");
      panel.html("");
      ppieexpecteddeaths();
    }
    else if (selectedData == "Excess Deaths"){
      var panel = d3.select("#pie");
      panel.html("");
      pieexcessdeaths();
    }
    
  }
  
  function init() {
    var dropdownValues= ["Total Deaths", "Expected Deaths", "Excess Deaths"];
    var dropdownMenu = d3.select("#selDataset");
    dropdownValues.forEach((sample)=>{
      dropdownMenu.append("option")
      .text(sample)
      .property("value", sample);
    })
  }
  init();