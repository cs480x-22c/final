const svgSize = 500;
var placeholder = "Search";
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
        .domain([6.07, -1.46]) // unit: magnitude
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
        .attr('id', d => d.properties.name)
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


    addBlur(svg)


}

function addBlur(svg){
    //TODO:  find source
    //Container for the gradients
    let defs = svg.append("defs");

    //Filter for the outside glow
    let filter = defs.append("filter")
        .attr("id", "glow");
    filter.append("feGaussianBlur")
        .attr("stdDeviation", "3.5")
        .attr("result", "coloredBlur");
    let feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    d3.selectAll("path")
        .style("filter", "url(#glow)");
    //end glow
}

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

//search function
Promise.all([
    d3.csv('StarDescriptions.csv')
]).then(([data]) => {
    appendConstellations(data);
});

function appendConstellations(data) {
    var divTag = document.getElementById("constellationDropdown");
    for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i]["Star Name"];
        option.innerHTML = data[i]["Star Name"];
        divTag.appendChild(option);
        option.addEventListener("click", function () {
            changeValue(this.innerHTML);
        });
    }
}

function changeValue(value) {
    var input = document.getElementById("searchInput");
    input.value = value;
    console.log(value);
}

function showOptions() {
    document.getElementById("constellationDropdown").classList.toggle("show");
}

function filter(e) {
    let searchField = document.getElementById("searchInput").value.toUpperCase();
    const div = document.getElementById("constellationDropdown");
    const options = Array.from(div.getElementsByTagName("option"));
    var dropdwn = document.getElementById("dropdown");
    dropdwn.style.height = '200px';
    var height = 200;
    //show options that match search field
    options.filter((option) => {
        return option.value.toUpperCase().includes(searchField);
    }).forEach(option => {
        if (height <= 500) {
            height = height + 50;
            dropdwn.style.height = '' + height + 'px';
        }
        option.classList.remove("filtered");
    });

    //filter out options that don't match search field
    options.filter((option) => {
        return !option.value.toUpperCase().includes(searchField);
    }).forEach(option => {
        option.classList.add("filtered");
    });

    if (options.length > 10) {

    }

    for (var i = 0; i < options.length; i++) {

    }
}