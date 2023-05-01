console.log("Lineplot");
class LinePlot {
  constructor(tag, xLabel, yLable) {
    this.colors=[
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f55",
      "#55dd33",
      "#a65628",
      "#f781bf",
      "#999999",
    ]
    console.log(tag);
    var element = document.getElementById(tag);
    element.style.visibility='visible'
    var bBox = element.getBoundingClientRect();
    let height = 400;
    let width = bBox.width-10;
    tag = "#" + tag;
    console.log(width, height);
    (this.margin = { top: 20, right: 20, bottom: 60, left: 100 }),
      (this.width = width - this.margin.left - this.margin.right),
      (this.height = height - this.margin.top - this.margin.bottom);

    // console.log(this.width, this.margin.left, this.margin.right);
    // console.log(this.height, this.margin.top, this.margin.bottom);
    // set the ranges

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    this.svg = d3
      .select(tag)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    // Initialise a X axis:


    var locale = d3.formatLocale({
      thousands: "",
    });
    
    var format = locale.format(".0f");

    this.x = d3.scaleLinear().range([0, this.width]);
    this.xAxis = d3.axisBottom().scale(this.x).tickFormat(format)
    //.tickFormat(''axisFormatLocale.format('')'');;
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${this.height})`)
      .attr("class", "myXaxis");

    // Initialize an Y axis
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.yAxis = d3.axisLeft().scale(this.y);
    this.svg.append("g").attr("class", "myYaxis");

    // X axis label:
    this.svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", this.width / 2 + this.margin.left - xLabel.length * 4)
      .attr("y", this.height + this.margin.top + 20)
      .text(xLabel);

    // Y axis label:
    
    this.svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin.left + 20)
      .attr("x", -this.margin.top - this.height / 2 + yLable.length * 2)
      .text(yLable); // Create a function that takes a dataset as input and update the plot:
  }
  update(data, groupby) {
    console.log(data);
    const sumstat = d3.group(data, (d) => d[groupby]);
    let self = this;
    // Create the X axis:
    this.x.domain([
      d3.min(data, function (d) {
        return d.date;
      }),
      d3.max(data, function (d) {
        return d.date;
      }),
    ]);
    this.svg.selectAll(".myXaxis").call(this.xAxis);

    // create the Y axis
    this.y.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);
    this.svg.selectAll(".myYaxis").call(this.yAxis);

    // Create a update selection: bind to the new data
    const chart = this.svg.selectAll(".lineTest").data(sumstat); //,function(d){return d["idx"]});
    const color = d3
      .scaleOrdinal()
      .range(this.colors);
    // Updata the line
    chart
      .enter()
      .append("path")
      .attr("class", "lineTest")
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return color(d[0]);
      })
      .attr("stroke-width", 2.5)
      .attr("d", function (d) {
        return d3
          .line()
          .x(function (d) {
            return self.x(d.date);
          })
          .y(function (d) {
            return self.y(d.value);
          })(d[1]);
      });
  }
}
