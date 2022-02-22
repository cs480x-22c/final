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
        .attr('id', d => d.id);

    // draw stars
    svg.selectAll('circle')
        .data(stars)
        .enter()
        .append('circle')
        .attr('cx', d => proj([d.Lon, d.Lat])[0])
        .attr('cy', d => proj([d.Lon, d.Lat])[1])
        .attr("r", d => sizeScale(d.Mag))
        .attr('id', d => d.HD)
        .attr("fill", "white");

    //draw border
    svg.append("circle")
        .attr("cx", svgSize / 2)
        .attr("cy", svgSize / 2)
        .attr("r", ((svgSize - 10) / 2))
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("fill", "none");
}

Promise.all([
    d3.csv('StarDescriptions.csv')
]).then(([data]) => {
    appendConstellations(data);
});

function appendConstellations(data){
    var divTag = document.getElementById("constellationDropdown");
    for(var i = 0; i < data.length; i++){
        console.log(data[i]["Star Name"]);
        var option = document.createElement("option");
        option.value = data[i]["Star Name"];
        option.innerHTML = data[i]["Star Name"];
        divTag.appendChild(option);
        option.addEventListener("click", function(){
            changeValue(this.innerHTML);
        });
    }
}

function changeValue(value){
    var input = document.getElementById("searchInput");
    input.value = value;
    console.log("here");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showOptions() {
    document.getElementById("constellationDropdown").classList.toggle("show");
}
  
function filter() {
    var input, filter, option;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("constellationDropdown");
    option = div.getElementsByTagName("option");
    for (i = 0; i < option.length; i++) {
        txtValue = option[i].textContent || option[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        option[i].style.display = "";
        } else {
        option[i].style.display = "none";
        }
    }
}