var Datas =d3.json('/api_excessdeaths')

console.log(Datas)


function pietotaldeaths(){
    d3.json("/api_excessdeaths").then(function(response){
      var Jurisdiction = response.map(covid=>covid.Jurisdiction);
      var deaths = response.map(covid=>covid.deaths);
      // console.log(country);
      
      var totaldeathsdata = [{
        values: deaths,
        labels: Jurisdiction,
        //domain: {column: 0},
        name: 'Total Deaths',
        hoverinfo: 'labels + values + name',
        textinfo: 'none',
        hole: .4,
        type: 'pie'
      }];
  
      var totaldeathsLayout = {
        title: 'Total deaths due to COVID-19 by Country',
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
      var jurisdiction = response.map(covid=>covid.Jurisdiction);
      var expecteddeaths = response.map(covid=>covid.expected_deaths);
      // console.log(country);
     
      var totalexpecteddeaths = [{
        values: expecteddeaths,
        labels: jurisdiction,
        //domain: {column: 0},
        name: 'Total Expected Deaths',
        hoverinfo: 'labels + values + name',
        textinfo: 'none',
        hole: .4,
        type: 'pie'
      }];
  
      var totalexpecteddeathslayout = {
        title: 'Expected deaths due to COVID-19 by Country',
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
    Plotly.newPlot("pie", totalexpecteddeaths, totalexpecteddeathslayout);
    });
  }
  
  
  function pieexcessdeaths(){
    d3.json("/api_excessdeaths").then(function(response){
      var jurisdiction = response.map(covid=>covid.Jurisdiction);
      var excessdeaths = response.map(covid=>covid.excess_deaths);
      // console.log(country);
      
      var excessdeathsData = [{
        values: excessdeaths,
        labels: jurisdiction,
        //domain: {column: 0},
        name: 'Excess Deaths',
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
    Plotly.newPlot("pie", excessdeathsData, excessdeathsLayout);
    });
  }
  
  
  
  
  function optionChanged(selectedData){
    if (selectedData =="Total Deaths"){
      var panel = d3.select("#pie");
      panel.html("");
      pietotaldeaths();
    } 
    else if (selectedData == "Expected Deaths"){
      var panel = d3.select("#pie");
      panel.html("");
      pieexpecteddeaths();
    }
    else if (selectedData == "Excess Deaths"){
      var panel = d3.select("#pie");
      panel.html("");
      pieexcessdeaths();
    }
    
  }
  
  function init() {
    var dropdownValues= ["Total Deaths", "Expected Deaths", "Excess Deaths"];
    var dropdownMenu = d3.select("#selData");
    dropdownValues.forEach((sample)=>{
      dropdownMenu.append("option")
      .text(sample)
      .property("value", sample);
    })
  }
  init();