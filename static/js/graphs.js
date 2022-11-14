var display = function (d, data) {
    var htmlString = "<p>ID: " + data[d][0] + "</p>";

    for (let i = 1; i < data[d].length; i++) {
        htmlString += "<p>Val" + i + ": " + data[d][i] + "</p>";
    }
    document.getElementById("output").innerHTML = htmlString;
};
var update = function (data) {
    console.log(data[10]["id_person"]);
    svg
        .selectAll("circle")
        .data(data, (d) => d["id_person"])
        .join(
            (enter) =>
                enter
                    .append("circle")
                    .attr("cy", function (d) {
                        return 300 - d[yAxis];
                    })
                    .attr("cx", function (d) {
                        return d[xAxis] * 4;
                    })
                    .attr("r", 3)
                    .style("fill", "Red")
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
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("cursor", "pointer")
                            .attr("r", 6)
                            .style("fill", "green");
                        if (this.toggle) {
                            console.log(this);
                        }
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("r", this.toggle ? 9 : 3)
                            .style("fill", this.toggle ? "green" : "red");
                    }),
            (update) =>
                update
                    .attr("cy", function (d) {
                        return 300 - d[yAxis];
                    })
                    .attr("cx", function (d) {
                        return d[xAxis] * 4;
                    }),
            (exit) => exit.remove()
        );
};
const svg = d3.select("#plot").append("svg").append("g");