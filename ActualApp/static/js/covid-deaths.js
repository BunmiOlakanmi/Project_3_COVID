//function buildCharts(sampleId){
  d3.json('/api_covid_infection').then(function(response){
    console.log(response)
    var country = response.Country;
    var totalCases = response.Total_Cases;
    var totalDeaths = response.Total_Deaths;
    var totalRecovered = response.Total_Recovered;
    var activeCases = response.Active_Cases;
    var totalTests = response.Total_Tests;
    var population = response.Population;

    var totalCasesData = [{
      values: totalCases,
      labels: country,
      //domain: {column: 0},
      name: 'Total Cases',
      hoverinfo: 'labels + values + name',
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
      var totalDeathsData = [{
        values: totalDeaths,
        labels: country,
        //domain: {column: 0},
        name: 'Total Deaths',
        hoverinfo: 'labels + values + name',
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
        var totalRecoveredData = [{
          values: totalRecovered,
          labels: country,
          //domain: {column: 0},
          name: 'Total Recovered',
          hoverinfo: 'labels + values + name',
          hole: .4,
          type: 'pie'
        }];
    
        var totalRecoveredLayout = {
          title: 'Total COVID-19 Cases Recovered by Country',
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

          var activeCasesData = [{
            values: activeCases,
            labels: country,
            //domain: {column: 0},
            name: 'Active Cases',
            hoverinfo: 'labels + values + name',
            hole: .4,
            type: 'pie'
          }];
      
          var totalCasesLayout = {
            title: 'Total COVID-19 Active Cases by Country',
            // annotations: 
            // {
            //   font: {
            //     size: 20
            //   },
            //   showarrow: false,
            //   text: 'COVID-19',
            //   x: 0.17,
            //   y: 0.5
            // }
          };
    Plotly.newPlot("pie", totalCasesData, totalCasesLayout);
    Plotly.newPlot("pie", totalDeathsData, totalDeathsLayout);
    Plotly.newPlot("pie", totalRecoveredData, totalRecoveredLayout);
    Plotly.newPlot("pie", activeCasesData, activeCasesLayout);

  });

  // Get the above data to populate left hand side html div (to provide textual data besides the chart)
  var panel = d3.select("#country-data");
    panel.html("");
    panel.append("p").text(`country: ${country}`);
    panel.append("p").text(`Total Cases: ${totalCases}`);
    panel.append("p").text(`Total Deaths: ${totalDeaths}`);
    panel.append("p").text(`Total Recovered: ${totalRecovered}`);
    panel.append("p").text(`Active Cases: ${activeCases}`);
    panel.append("p").text(`Total Tests: ${totalTests}`);
    panel.append("p").text(`Population: ${population}`);

    // Data for the Donut chart
    

  // Plot the donut chart
        
// };

// Function to select the country that the donut chart will be built
function optionChanged(selectedCountry){
    buildCharts(selectedCountry);
  }

// Function to initiate the program. 
function init() {
//     //Read the json file and retrieve the data from samples 
    d3.json("/api_covid_infection").then((data) => {
//       //var samples = data.samples;
      var firstSampleId  = reponse.Country;
      buildCharts(firstSampleId);  
//       // var metaData = data.metadata;
//       // console.log(metaData);
//       var firstCountry = samples[0].country;
//       console.log(samples[0]);
//       // Assign the value of the dropdown menu option to a variable
      var dropdownMenu = d3.select("#selDataset");
//       // Initialize an empty array for the sample data
      var ids = [];
      ids = response.Country;
      console.log(ids);
      for(i = 0; i<=ids.length; i++){
        var sampleCountry = dropdownMenu.append("option").text(ids[i]);
      }
    });
  };
  init();

  