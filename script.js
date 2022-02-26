const svgSize = 500;
const datatipWidth = 200;

let activeConstellation = null;
let constellationInfo;
let fullPaths;
let fullStars;

//for easy access
const COLORS =
{
    begin: 'black',
    isActive: '#ee5533',
    justActive: '#ddaa11',
    inActive: '#74c3c4'

}
//set svg size
d3.select("#north")
    .attr("width", svgSize)
    .attr("height", svgSize);

d3.select("#south")
    .attr("width", svgSize)
    .attr("height", svgSize);

//draw maps
Promise.all([
    d3.json('paths_north.geojson'),
    d3.csv('stars_north.csv')
]).then(([data, stars]) => {
    createMap(data, stars, [0, -90], "#north");
});

Promise.all([
    d3.json('paths_south.geojson'),
    d3.csv('stars_south.csv')
]).then(([data, stars]) => {
    createMap(data, stars, [180, 90], "#south");
});

function createMap(data, stars, rotation, svgID) {
    const svg = d3.select(svgID);

    let proj = d3.geoAzimuthalEqualArea()
        .rotate(rotation)
        .fitExtent([[5, 5], [svgSize - 5, svgSize - 5]], data)
    let gpath = d3.geoPath().projection(proj);

    sizeScale = d3.scaleLinear()
        .domain([6.07, -1.46]) // unit: magnitude
        .range([1, 5]) // unit: pixels

    // draw constellation
    d3.select(svgID)
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', function (d) { return gpath(d); })
        .attr('stroke-width', 2)
        .attr('stroke', COLORS.begin)
        .attr('id', d => d.properties.name.replace(" ", "_"))
        .on("mouseover", e => mouseOverConstellation(e))
        .on("mouseout", e => mouseOffConstellation(e));

    // draw stars
    svg.selectAll('circle')
        .data(stars)
        .enter()
        .append('circle')
        .attr('cx', d => proj([d.Lon, d.Lat])[0])
        .attr('cy', d => proj([d.Lon, d.Lat])[1])
        .attr("r", d => sizeScale(d.Mag))
        .attr('class', d => d.Constellation.replace(" ", "_"))
        .attr("fill", "#aaaaaa")
        .on("mouseover", e => mouseOverStar(e))
        .on("mouseout", e => mouseOffStar(e));

    //draw border
    svg.append("circle")
        .attr("cx", svgSize / 2)
        .attr("cy", svgSize / 2)
        .attr("r", ((svgSize - 10) / 2))
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("fill", "none");

    addBlur(svg);
}

function addBlur(svg) {
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
function mouseOverStar(e) {
    activateConstellation('#' + e.target.classList[0], true)
}

function mouseOffStar(e) {
    activateConstellation('#' + e.target.classList[0], false)
}

function mouseOverConstellation(e) {
    activateConstellation('#' + e.target.id, true)
}

function mouseOffConstellation(e) {
    activateConstellation('#' + e.target.id, false)
}

function activateConstellation(path, active) {
    if (active) {
        //unactivate current constellation
        activeConstellation ? activateConstellation(activeConstellation, false) : null
        activeConstellation = path;
        showDatatip(path);
        d3.selectAll(path)
            .transition().duration(200)
            .style('stroke-width', '5')
            .style('stroke', COLORS.isActive);
    }
    else {
        activeConstellation = null
        hideDatatip(path);
        d3.selectAll(path)
            .transition().duration(200)
            .style('stroke-width', '2')
            .style('stroke', COLORS.justActive)
            .transition().duration(5000)
            .style('stroke', COLORS.inActive);
    }
}

//search function
Promise.all([
    d3.csv('StarDescriptions.csv'),
    d3.csv("stars.csv"),
    d3.json("paths.geojson")
]).then(([data, stars, paths]) => {
    appendConstellations(data, stars, paths);
});

function appendConstellations(data, stars, paths) {
    //store information in global variables 
    constellationInfo = data;
    fullStars = stars;
    fullPaths = paths;

    var divTag = document.getElementById("constellationDropdown");
    for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i]["Star Name"];
        option.innerHTML = data[i]["Star Name"];
        divTag.appendChild(option);
        option.addEventListener("click", e => {
            activateConstellation(('#' + e.target.value.replace(" ", "_")), true);
        });
    }
}

function showOptions() {
    document.getElementById("constellationDropdown").classList.toggle("hidden");
}

function filter() {
    let searchField = document.getElementById("searchInput").value.toUpperCase();
    const div = document.getElementById("constellationDropdown");
    const options = Array.from(div.getElementsByTagName("option"));

    //show options that match search field
    options.filter((option) => {
        return option.value.toUpperCase().includes(searchField);
    }).forEach(option => {
        option.classList.remove("hidden");
    });

    //filter out options that don't match search field
    options.filter((option) => {
        return !option.value.toUpperCase().includes(searchField);
    }).forEach(option => {
        option.classList.add("hidden");
    });
}

//datatips
function showDatatip(constellation) {
    constellation = constellation.substring(1);
    constellation = constellation.replace("_", " ");
    info = constellationInfo.filter(item => item["Star Name"] == constellation)[0];

    let desc = info.Description;
    let history = info.History;

    let html = `<p>${constellation}</p>
                <p>The ${desc}</p>
                <div><svg id="datatipImg" width=${datatipWidth} height=${datatipWidth}></svg></div>
                <p class="history">${history}</p>`;

    d3.select("#datatip")
        .html(html)
        .style("width", datatipWidth)
        .classed("hidden", false);

    d3.select("#datatipImg")
        .append("rect")
        .attr("width", datatipWidth)
        .attr("height", datatipWidth)
        .attr("fill", "black");

    //draw constellation in svg
    let path = fullPaths.features.filter(feature => feature.properties.name == constellation)[0];
    let geojson = { "type": "FeatureCollection", "features": [path] };
    let stars = fullStars.filter(star => star["Constellation"] == constellation);

    let proj = d3.geoAzimuthalEqualArea()
        .rotate([0, -90])
        .fitExtent([[5, 5], [datatipWidth - 5, datatipWidth - 5]], geojson)
    let gpath = d3.geoPath().projection(proj);

    sizeScale = d3.scaleLinear()
        .domain([6.07, -1.46]) // unit: magnitude
        .range([1, 5]) // unit: pixels

    d3.select("#datatipImg")
        .selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', function (d) { return gpath(d); })
        .attr('stroke-width', 2)
        .attr('stroke', "#74c3c4");

    d3.select("#datatipImg")
        .selectAll('circle')
        .data(stars)
        .enter()
        .append('circle')
        .attr('cx', d => proj([d.Lon, d.Lat])[0])
        .attr('cy', d => proj([d.Lon, d.Lat])[1])
        .attr("r", d => sizeScale(d.Mag))
        .attr("fill", "#aaaaaa");
}

function hideDatatip() {
    d3.select("#datatip")
        .classed("hidden", true);
}