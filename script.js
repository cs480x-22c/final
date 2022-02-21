const svgSize = 500;

//add svgs
d3.select("#map-container")
    .append("svg")
    .attr("width", svgSize)
    .attr("height", svgSize)
    .attr("id", "north");

d3.select("#map-container")
    .append("svg")
    .attr("width", svgSize)
    .attr("height", svgSize)
    .attr("id", "south");

//draw maps
Promise.all([
    d3.json('paths_north.geojson'),
    d3.csv('stars_north.csv')
]).then(([data, stars]) => {
    createMap(data, stars, -90, "#north");
});

Promise.all([
    d3.json('paths_south.geojson'),
    d3.csv('stars_south.csv')
]).then(([data, stars]) => {
    createMap(data, stars, 90, "#south");
});

function createMap(data, stars, rotation, svgID) {
    const svg = d3.select(svgID);

    let proj = d3.geoAzimuthalEqualArea()
        .rotate([0, rotation, 0])
        .fitExtent([[5, 5], [svgSize - 5, svgSize - 5]], data)
    let gpath = d3.geoPath().projection(proj);

    sizeScale = d3.scaleLinear()
        .domain([6.07, -1.46]) // unit: km
        .range([1, 5]) // unit: pixels

    // draw constellation
    svg.attr('id', 'data')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', function (d) { return gpath(d); })
        .attr('stroke-width', 2)
        .attr('stroke', 'steelblue')
        .attr('id', d => d.id)
        .on("mouseover", mouseOverConstellation)
        .on("mouseout", mouseOffConstellation);


    // draw stars
    svg.selectAll('circle')
        .data(stars)
        .enter()
        .append('circle')
        .attr('cx', d => proj([d.Lon, d.Lat])[0])
        .attr('cy', d => proj([d.Lon, d.Lat])[1])
        .attr("r", d => sizeScale(d.Mag))
        .attr('id', d => d.HD)
        .attr("fill", "#aaaaaa")
        .on("mouseover", mouseOverStar)
        .on("mouseout", mouseOffStar);

    //draw border
    svg.append("circle")
        .attr("cx", svgSize / 2)
        .attr("cy", svgSize / 2)
        .attr("r", ((svgSize - 10) / 2))
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("fill", "none");


    //glow effect?
    //Container for the gradients
var defs = svg.append("defs");

//Filter for the outside glow
var filter = defs.append("filter")
    .attr("id","glow");
filter.append("feGaussianBlur")
    .attr("stdDeviation","3.5")
    .attr("result","coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");

    d3.selectAll("path")
    .style("filter", "url(#glow)");
    //end glow

    //functions for animations
    function mouseOverStar() {
        d3.select(this)
        .transition().duration(300)
        .style('fill', 'white');
    }

    function mouseOffStar() {
        d3.select(this)
        .transition().duration(300)
        .style('fill', 'white');
    }

    function mouseOverConstellation() {
        d3.select(this)
        .transition().duration(200)
        .style('stroke-width', '5')
        .style('stroke', '#ddaa11');
    }

    function mouseOffConstellation() {
        d3.select(this)
        .transition().duration(200)
        .style('stroke-width', '2')
    }
}