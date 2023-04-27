console.log("Lineplot");
class LinePlot{
    constructor(tag) {
        var element = document.getElementById(tag)
      var bBox = element.getBoundingClientRect()
      let height = bBox.height
      let width = bBox.width
      tag = "#"+tag
      console.log(width,height);
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 },
            this.width = width - this.margin.left - this.margin.right,
            this.height = height - this.margin.top - this.margin.bottom;

            console.log(this.width,this.margin.left,this.margin.right);
            console.log(this.height,this.margin.top,this.margin.bottom);
      // set the ranges
      this.svg = d3.select(tag).append("svg")
      this.plotArea = this.svg.append("g")
          
      this.svg
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)
          .attr("style", "outline: thin solid black;");

    
      this.plotArea.attr(
          "transform",
          "translate(" + [this.margin.left, this.margin.top] + ")"
        );

      this.xAxis = this.svg.append("g")
      this.xAxis.attr(
          "transform",
          "translate(" + this.margin.left + "," + (this.height + this.margin.top) + ")"
        )
      
      this.yAxis = this.svg.append("g")
      this.yAxis.attr(
          "transform", 
          "translate(" + this.margin.left + "," + this.margin.top + ")"
          )
    }

    draw(data){
        var chart = this.plotArea
       chart.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
    }
}