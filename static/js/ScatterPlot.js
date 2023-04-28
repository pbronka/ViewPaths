console.log("scatter");
class ScatterPlot {
    constructor(tag) {
      this.colors=[
        "#e41a1c",
        "#377eb8",
        "#4daf4a",
        "#984ea3",
        "#ff7f00",
        "#ffff33",
        "#a65628",
        "#f781bf",
        "#999999",
      ]
      this.colorCount = 0
      var element = document.getElementById(tag)
      var bBox = element.getBoundingClientRect()
      let height = bBox.height
      let width = bBox.width
      tag = "#"+tag
      // console.log(width,height);
        this.margin = { top: 20, right: 20, bottom: 40, left: 80 },
            this.width = width - this.margin.left - this.margin.right,
            this.height = height - this.margin.top - this.margin.bottom;

            // console.log(this.width,this.margin.left,this.margin.right);
            // console.log(this.height,this.margin.top,this.margin.bottom);
      // set the ranges


        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
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
        this.xBrush = this.xAxis.append("g")
        this.xBrush.attr("class", "brushX")    

        this.yAxis = this.svg.append("g")
        this.yAxis.attr(
            "transform", 
            "translate(" + this.margin.left + "," + this.margin.top + ")"
            )
        this.yBrush = this.yAxis.append("g")
        this.yBrush.attr("class", "brushY")
          

        const clippingRect = this.plotArea
        .append("clipPath")
        .attr("id", "clippy")
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("fill", "none");

        this.brushY = d3
        .brushY()
        .extent([
        [- this.margin.left, 0],
          [0, this.height],
          
        ])

        this.brushX = d3
          .brushX()
          .extent([
            [0, 0],
            [this.width, this.height],
          ])

    }
    draw(data, xaxis, yaxis, color="grey" ,index="") {
        self = this
        var update = function(){
            self.xAxis.transition().duration(1000).call(d3.axisBottom(x))          
            self.yAxis.transition().duration(1000).call(d3.axisLeft(y))          
            self.plotArea.selectAll("circle")
            .transition().duration(1000)
            .attr("cx", function (d) {
              return x(d[xaxis]);
            })
            .attr("cy", function (d) {
              return y(d[yaxis]);
            })
          }
          var updateX= function (e) {
            if (e.selection!=null) {
              x.domain([ x.invert(e.selection[0]), x.invert(e.selection[1]) ])
              self.xAxis.select(".brushX").call(self.brushX.move, null);
              update()
            }
          };
          
        this.brushX.on("end", updateX);
        this.xBrush.call(this.brushX);
        this.svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", this.width / 2 + this.margin.left - 5 * 4)
      .attr("y", this.height + this.margin.top + 40)
      .text(xaxis);

        var updateY= function (e) {
          if (e.selection!=null) {
            y.domain([  y.invert(e.selection[1]),y.invert(e.selection[0]), ])
            self.yAxis.select(".brushY").call(self.brushY.move, null);
            update()
          }
        };
  


        this.brushY.on("end", updateY);
        this.yBrush.call(this.brushY);

        this.plotArea
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -this.margin.left + 20)
        .attr("x", -this.margin.top - this.height / 2 )//+ yLable.length * 8)
        .text(yaxis); // Create a function that takes a dataset as input and update the plot:

        
        let x = d3
        .scaleLinear()
        .range([0, this.width])
        .domain([
          0,
          d3.max(data, function (d) {
            return d[xaxis];
          }),
        ])
        .nice();
      let y = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([
          0,
          d3.max(data, function (d) {
            return d[yaxis];
          }),
        ])
        .nice();

        // append the rectangles for the bar chart
        var chart = this.plotArea.selectAll("circle")
        chart.data(data,function(d){return d["id_person"]})
            .enter().append("circle")// new data
            .attr("cx", function (dd) { return x(dd[xaxis]); })
            .attr("cy", function (dd) { return y(dd[yaxis]); })
            .attr("r", 2)
            .style("fill", color)
            .on("click", function (d) {
                this.toggle = !this.toggle; // declagrey variable setting it to true
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", this.toggle ? 9 : 2)
                if (this.toggle) {
                    console.log(this.__data__[xaxis],this.__data__[yaxis],this.__data__[index])
                }
            })
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("cursor", "pointer")
                    .style("fill",  self.colors[self.colorCount])
                    .attr("r", 6)
    
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("r", this.toggle ? 9 : 2)
                    .style("fill", this.toggle ?  this.color : "grey");
            })
            .on("click", function (d) {
                this.toggle = !this.toggle; // declagrey variable setting it to true
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", this.toggle ? 9 : 2)
                    .style("fill", this.toggle ?  self.colors[self.colorCount]:"grey");
                this.color = self.colors[self.colorCount]
                if (this.toggle) {
                    personId = this.__data__.id_person
                    idcol[personId.toString()] = self.colors[self.colorCount]
                    getPersonData()
                    
                } else {
                    personId = ""
                }
                self.colorCount++;
            })
            .attr("clip-path", "url(#clippy)");;;
        chart.attr("cx", function (dd) { return x(dd[xaxis]); }) // current data
            .attr("cy", function (dd) { return y(dd[yaxis]); })
        // add the x Axis
        .attr("clip-path", "url(#clippy)");;
        chart.exit().remove() // remove data

        this.xAxis
        .call(d3.axisBottom(x)).on("dblclick",function(d){ x.domain([
            0,
            d3.max(data, function (d) {
              return d[xaxis];
            }),
          ])
          .nice(); update()});

        // add the y Axis
        this.yAxis
        .call(d3.axisLeft(y)).on("dblclick",function(d){ y.domain([0,
            d3.max(data, function (d) {
              return d[yaxis];
            })
          ])
          .nice(); update()});

    }
}