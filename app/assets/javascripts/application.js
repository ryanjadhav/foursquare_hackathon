// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function renderContentPage() {
	$('#overview').hide();
	$('#content').show();
}

function renderChart() {
	clearChart();
	drawChart();
	//$('#chartDiv').html("<img src=\"/assets/apple.png\">");
	//$('#chartDiv').html("<img src=\"/assets/apple.png\">");
}

function clearChart() {
	$('#chartDiv').html('');
}


function drawChart() {
	var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d%H").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var checkinY = d3.scale.linear()
    .range([height, 40]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var svg = d3.select("#chartDiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var stocksquareData = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  var checkins = stocksquareData[0];
  var stockPrice = stocksquareData[1];

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(stockPrice.values, function(v) { return v.temperature; }),
    d3.max(stockPrice.values, function(v) { return v.temperature; })
  ]);

  checkinY.domain([0, 10]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Stock Price");

  checkins.values.forEach(function(c) {
    for (var i = 0; i < c.temperature; i++) {
      svg.append("image")
          .attr("xlink:href", "https://ss0.4sqi.net/img/blank_boy-82b50670208ac7994bba547c50a6ad80.png")
          .attr("width", 32)
          .attr("height", 32)
          .attr("y", checkinY(i) - 40)
          .attr("x", x(c.date) - 16);
    }
  });

  var city = svg.selectAll(".city")
      .data([stockPrice])
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});
}


