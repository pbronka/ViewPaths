let dimensions = {
    width: 400,
    height: 500,
    margins: 50,
};

var display = function (d, data) {
    var htmlString = "<p>ID: " + data[d][0] + "</p>";
    for (let i = 1; i < data[d].length; i++) {
        htmlString += "<p>Val" + i + ": " + data[d][i] + "</p>";
    }
    document.getElementById("output").innerHTML = htmlString;
 };


var update = function (data) {
    console.log("update");
    // const xAccessor = (d) => d[xAxis]
    // const yAccessor = (d) => d[yAxis]
    // .data(data, (d) => d["id_person"])
    topx = d3.max(data, function (d) {
        return d[xAxis]
    })
    const x = d3.scaleLinear().domain([0, topx]).range([0, width]);
    svg.selectAll("#xaxis").remove()
    svg.append("g")
        .attr("id","xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Y Axis
    topy = d3.max(data, function (d) {
        return d[yAxis]
    })
    const y = d3.scaleLinear().domain([0, topy]).range([height, 0]);
    svg.selectAll("#yaxis").remove()
    svg.append("g").attr("id","yaxis").call(d3.axisLeft(y));
    // Dots
    var dots = svg
        .selectAll("circle")
        .data(data, function (d) {
            return d["id_person"];
        });

    dots
        .enter()
        .append("circle")
        .on("mouseover", function (d) {
            console.log(this.__data__.id);
            d3.select(this)
                .attr("cursor", "pointer")
                .style("fill", "green");
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .attr("r", this.toggle ? 9 : 3)
                .style("fill", this.toggle ? "green" : "red");
        })
        .on("click", function (d) {
            this.toggle = !this.toggle; // declared variable setting it to true
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("r", this.toggle ? 9 : 3)
                .style("fill", this.toggle ? "green" : "red");
            if (this.toggle) {
                personId = this.__data__.id_person
                getPersonData()
            } else {
                personId = ""
            }

        })
        .attr("cx", function (d) {
            return x(d[xAxis]);
        })
        .attr("cy", function (d) {
            return y(d[yAxis]);
        })
        .attr("r", 3)
        .style("fill", "Red");


    dots.attr("cx", function (d) {
        return x(d[xAxis]);
    })
        .attr("cy", function (d) {
            return y(d[yAxis]);
        })
    dots.exit().remove()
};





dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
dimensions.containerHeight = dimensions.height - dimensions.margins * 2;



// Scales

var element = document.getElementById("plot")
var bBox = element.getBoundingClientRect()

const margin = 40;
var width = bBox.width - margin * 2;
var height = bBox.height - margin * 2;

// Create Random Points


// Append SVG Object to the Page
const svg = d3
    .select("#plot")
    .append("svg")
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

    