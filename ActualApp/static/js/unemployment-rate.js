var svgWidth = 960;
var svgHeight = 600;
padding = 100;


leftMargin=70
topMargin=30
bottomMargin=40
rightMargin=40

var width = svgWidth - leftMargin - rightMargin;
var height = svgHeight - topMargin - bottomMargin;


d3.csv("unemployment_rates.csv").then(function(unemploymentdata) {

    var parseTime = d3.timeParse("%Y-%m-%d");

    unemploymentdata.forEach(function(data) {
        data.Time_dt = parseTime(data.Time_dt);
        data.Unemployment_Rate = +data.Unemployment_Rate;
        data.Country = data.Country;

    });

// define the x scale (horizontal)
var mindate = new Date(2020,02,28),
    maxdate = new Date(2020,09,01);


// scale xAxis
var xScale = d3.scaleTime()
    .domain([mindate, maxdate])
    .range([leftMargin, 900])

// scale yAxis
var yScale=d3.scaleLinear()
    .domain([0, 25])
    .range([600, padding]);

xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%Y-%m-%d"));

d3.select("svg")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,620)")
    .call(xAxis)
    .append("text")
    .attr("x", (900+70)/2) 
    .attr("y", "50")
    .text("April 2020 to October 2020")

yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(12)

d3.select('svg')
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${leftMargin},20)`) //use variable in translate
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-190")
    .attr("y", "-40")
    .attr("text-anchor", "end")
    .text("Unemployment Rates Worldwide (%)")

var sumstat = d3.nest() 
    .key(d => d.Country)
    .entries(unemploymentdata);

console.log(sumstat)

//set color pallete for different vairables
var Countryname = sumstat.map(d => d.key) 
var color = d3.scaleOrdinal().domain(Countryname).range(colorbrewer.Set2[6])

//select path - three types: curveBasis,curveStep, curveCardinal
d3.select("svg")
    .selectAll(".line")
    .append("g")
    .attr("class", "line")
    .data(sumstat)
    .enter()
    .append("path")
    .attr("d", function (d) {
        return d3.line()
            .x(d => xScale(d.Time_dt))
            .y(d => yScale(d.Unemployment_Rate)).curve(d3.curveLinear)
            (d.values)
    })
    .attr("fill", "none")
    .attr("stroke", d => color(d.key))
    .attr("stroke-width", 2)
    

//append title
d3.select("svg")
    .append("text")
    .attr("x", 500)
    .attr("y", 70)
    .attr("text-anchor", "middle")
    .text("Country-wise breakdown of Unemployment due to COVID-19")
    .style("fill", "black")
    .style("font-size", 20)
    .style("font-family", "Arial Black")    

//append circle 
var circlesGroup = d3.select("svg")
    .selectAll("circle")
    .append("g")
    .data(unemploymentdata)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.Time_dt))
    .attr("cy", d => yScale(d.Unemployment_Rate))
    .attr("r", 6)
    .style("fill", d => color(d.Country))


//append legends
var legend = d3.select("svg")
    .selectAll('g.legend')
    .data(sumstat)
    .enter()
    .append("g")
    .attr("class", "legend")

// Initialize tool tip 
var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([40, 40])
      .html(function(d) {
        return (`${d.Country}<br>${d.Unemployment_Rate}`);
      });

    // Create tool tip
    // ==============================
    d3.select("svg")
        .call(toolTip);

    // Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

})

