function pietotalCases(){
  d3.json('/api_covid_infection').then(function(response){
    var country = response.map(covid=>covid.Country);
    var totalCases = response.map(covid=>covid.Total_Cases);
    // console.log(country);
    
    var totalCasesData = [{
      values: totalCases,
      labels: country,
      //domain: {column: 0},
      name: 'Total Cases',
      hoverinfo: 'labels + values + name',
      textinfo: 'none',
      hole: .4,
      type: 'pie'
    }];

    var totalCasesLayout = {
      title: 'Total COVID-19 Cases by Country',
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
  Plotly.newPlot("pie", totalCasesData, totalCasesLayout);
  });
}


function pietotalDeaths(){
  d3.json('/api_covid_infection').then(function(response){
    var country = response.map(covid=>covid.Country);
    var totalDeaths = response.map(covid=>covid.Total_Deaths);
    // console.log(country);
   
    var totalDeathsData = [{
      values: totalDeaths,
      labels: country,
      //domain: {column: 0},
      name: 'Total Deaths',
      hoverinfo: 'labels + values + name',
      textinfo: 'none',
      hole: .4,
      type: 'pie'
    }];

    var totalDeathsLayout = {
      title: 'Total COVID-19 Deaths by Country',
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
  Plotly.newPlot("pie", totalDeathsData, totalDeathsLayout);
  });
}


function pieactiveCases(){
  d3.json('/api_covid_infection').then(function(response){
    var country = response.map(covid=>covid.Country);
    var activeCases = response.map(covid=>covid.Active_Cases);
    // console.log(country);
    
    var activeCasesData = [{
      values: activeCases,
      labels: country,
      //domain: {column: 0},
      name: 'Active Cases',
      hoverinfo: 'labels + values + name',
      textinfo: 'none',
      hole: .4,
      type: 'pie'
    }];

    var activeCasesLayout = {
      title: 'Active COVID-19 Cases by Country',
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
  Plotly.newPlot("pie", activeCasesData, activeCasesLayout);
  });
}


function pietotalRecovered(){
  d3.json('/api_covid_infection').then(function(response){
    var country = response.map(covid=>covid.Country);
    var totalRecovered = response.map(covid=>covid.Total_Recovered);
    // console.log(country);
    
    var totalRecoveredData = [{
      values: totalRecovered,
      labels: country,
      //domain: {column: 0},
      name: 'Total Recovered',
      hoverinfo: 'labels + values + name',
      textinfo: 'none',
      hole: .4,
      type: 'pie'
    }];

    var totalRecoveredLayout = {
      title: 'Total COVID-19 Recovered by Country',
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
  Plotly.newPlot("pie", totalRecoveredData, totalRecoveredLayout);
  });
}


function pietotalTests(){
  d3.json('/api_covid_infection').then(function(response){
    var country = response.map(covid=>covid.Country);
    var totalTests = response.map(covid=>covid.Total_Tests);
    // console.log(country);
    
    var totalTestsData = [{
      values: totalTests,
      labels: country,
      //domain: {column: 0},
      name: 'Total Tests',
      hoverinfo: 'labels + values + name',
      textinfo: 'none',
      hole: .4,
      type: 'pie'
    }];

    var totalTestsLayout = {
      title: 'Total COVID-19 Tests by Country',
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
  Plotly.newPlot("pie", totalTestsData, totalTestsLayout);
  });
}


function piePopulation(){
  d3.json('/api_covid_infection').then(function(response){
    var country = response.map(covid=>covid.Country);
    var population = response.map(covid=>covid.Population);
    console.log(country);
    var populationData = [{
      values: population,
      labels: country,
      //domain: {column: 0},
      name: 'Population',
      hoverinfo: 'labels + values + name',
      textinfo: 'none',
      hole: .4,
      type: 'pie'
    }];

    var populationLayout = {
      title: 'Population by Country',
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
  Plotly.newPlot("pie", populationData, populationLayout);
  });
}

function optionChanged(selectedData){
  if (selectedData =="Total Cases"){
    var panel = d3.select("#pie");
    panel.html("");
    pietotalCases();
  } 
  else if (selectedData =="Total Deaths"){
    var panel = d3.select("#pie");
    panel.html("");
    pietotalDeaths();
  }
  else if (selectedData == "Active Cases"){
    var panel = d3.select("#pie");
    panel.html("");
    pieactiveCases();
  }
  else if(selectedData == "Total Recovered"){
    var panel = d3.select("#pie");
    panel.html("");
    pietotalRecovered();
  }
  else if (selectedData == "Total Tests"){
    var panel = d3.select("#pie");
    panel.html("");
    pietotalTests();
  }
  else if(selectedData == "Population"){
    var panel = d3.select("#pie");
    panel.html("");
    piePopulation();
  }
}

function init() {
  d3.json('/api_covid_infection').then(function(response){
    var country = response.map(covid=>covid.Country);
    var population = response.map(covid=>covid.Population);
    console.log(country);
    var populationData = [{
      values: population,
      labels: country,
      //domain: {column: 0},
      name: 'Population',
      hoverinfo: 'labels + values + name',
      textinfo: 'none',
      hole: .4,
      type: 'pie'
    }];

    var populationLayout = {
      title: 'Population by Country',
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
  Plotly.newPlot("pie", populationData, populationLayout);
  });
  var dropdownValues= ["Total Cases", "Total Deaths", "Active Cases", "Total Recovered", "Total Tests", "Population"];
  var dropdownMenu = d3.select("#selDataset");
  dropdownValues.forEach((sample)=>{
    dropdownMenu.append("option")
    .text(sample)
    .property("value", sample);
  })
}
init();



