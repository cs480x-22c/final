function makeNodeLinkGraph() {
  const color = d3.scaleOrdinal(d3.schemeCategory10),
        height = 500,
        data = d3.json("data.json");

  // chart = {
  const nodes = data.nodes.map(d => Object.create(d));
  const index = new Map(nodes.map(d => [d.id, d]));
  const links = data.links.map(d => Object.assign(Object.create(d), {
    source: index.get(d.source),
    target: index.get(d.target)
  }));

  const svg = d3.select(DOM.svg(width, height));

  const layout = cola.d3adaptor(d3)
      .size([width, height])
      .nodes(nodes)
      .links(links)
      .jaccardLinkLengths(40, 0.7)
      .start(30);
  
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", d => color(d.group))
      .call(layout.drag);

  node.append("title")
      .text(d => d.id);

  layout.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });

  invalidation.then(() => layout.stop());

  return svg.node();
  // }

}

function csv2json(csv){
      
    var nested = d3.nest()
        .key(function(d){ return d.sec; })
      .entries(csv)
        
    var json = nested.map(function(d){
      var timerecord = {};
      
      // this is the variable that we grouped by
      timerecord.sec = d.key; 

      timerecord.met = d.values[0].met;
      
      return timerecord;
    });
    
    return json;
  }

function createGraph() {
                 
    d3.csv("csv_data.csv", function(csv){
    
        csv.forEach(function(d){
            d.met = +d.met;
        });
                    
        console.table(csv);
        
        var json = csv2json(csv);

        // data = json;

        console.log("In d3.csv: ");
        // console.log("data: ");
        // console.log(data);
        
        console.log("json: ");

        console.log(json);
        
        var data = json;

        console.log("In createGraph2 after got json -> data");
        
        console.log("After d3.csv: ");
        console.log("data: ");
        console.log(data);
        console.log("json: ");
        console.log(json);

        var margin = {
            top: 40,
            right: 20,
            bottom: 60,
            left: 60
        }
        width = 700 - margin.left - margin.right;
        height = 500 - margin.top - margin.bottom;

        var x = d3.scaleLinear().range([0, width]);
        // var y = d3.scaleLinear().range([height, 0]);
        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.sec;
        }));
        // y.domain([0, d3.max(data, function (d) {
        //     return d.met;
        // })]);

        y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.met)).nice()
        .range([height, 0])
        // .range([height - margin.bottom, margin.top])

        var valueline = d3.line()
        .x(function (d) {
            return x(d.sec);
        })
        .y(function (d) {
            return y(d.met);
        });

        var svg = d3.select("#scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var path = svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return x(d.sec);
        })
        .attr("cy", function (d) {
            return y(d.met);
        })
        .attr("stroke", "#32CD32")
        .attr("stroke-width", 1.5)
        .attr("fill", "#FFFFFF");

        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        svg.append("g")
        .call(d3.axisLeft(y));

        // text label for the x axis
        svg.append("text")             
        .attr("transform",
                "translate(" + (width/2) + " ," + 
                            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Time (seconds)");

        // text label for the y axis
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Wavelength (meters)");

        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "bold")  
        .text(localStorage.getItem("currentDataFilename") + " " + localStorage.getItem("currentToolName"));
    
        // gridlines in x axis function
        function make_x_gridlines() {		
            return d3.axisBottom(x)
        }

        // gridlines in y axis function
        function make_y_gridlines() {		
            return d3.axisLeft(y)
        }

        // add the X gridlines
        svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

        // add the Y gridlines
        svg.append("g")			
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )
    })
}