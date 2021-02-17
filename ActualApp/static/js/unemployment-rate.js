var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 40,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.json('/api_unemployment').then(function(unemploymentdata) {

    var parseTime = d3.timeParse("%Y-%m-%d");
  
  // Step 1: Parse Data/Cast as numbers
    // ==============================
    unemploymentdata.forEach(function(data) {
      data.Time_dt = parseTime(data.Time_dt);
      data.Unemployment_Rate = +data.Unemployment_Rate;
    });

    // define the x scale (horizontal)
    var mindate = new Date(2020,01,31),
        maxdate = new Date(2020,08,01);

    // Step 2: Create scale functions
    // ==============================
    var xTimeScale = d3.scaleTime()
      .domain([mindate, maxdate])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(unemploymentdata, d => d.Unemployment_Rate)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xTimeScale)
      .tickFormat(d3.timeFormat("%Y-%m-%d"));
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
      .data(unemploymentdata)
      .enter()
      .append("circle")
      .attr("cx", d => xTimeScale(d.Time_dt))
      .attr("cy", d => yLinearScale(d.Unemployment_Rate))
      .attr("r", "15")
      .attr("fill", "orange")
      .attr("opacity", ".4");
 
    var dateFormatter = d3.timeFormat("%Y-%m-%d");


    // Step 1: Append tooltip div
    var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);

    // Step 2: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.style("display", "block")
          .html(
            `<strong>${d.Country}<strong><hr>${d.Unemployment_Rate}
        rate of unemployment`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })
      // Step 3: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 1.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Unemployment Rates Worldwide (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
      .attr("class", "axisText")
      .text("April 2020 to September 2020");
  }).catch(function(error) {
    console.log(error);
  });
