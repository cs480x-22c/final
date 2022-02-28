const svgSize = 700;
const datatipWidth = 250;

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

//load files
Promise.all([
    d3.json('paths.geojson'),
    d3.csv('stars.csv'),
    d3.json('paths_north.geojson'),
    d3.csv('stars_north.csv'),
    d3.json('paths_south.geojson'),
    d3.csv('stars_south.csv'),
    d3.csv('StarDescriptions.csv')
]).then(([paths, stars, pathsN, starsN, pathsS, starsS, desc]) => {
    createMap(pathsN, starsN, [0, -90], "#north"); //north hemisphere
    createMap(pathsS, starsS, [180, 90], "#south"); //south hemisphere
    appendConstellations(desc); //search

    //store info in global variables for easy access
    constellationInfo = desc;
    fullPaths = paths;
    fullStars = stars;
});

//draw stars in specified hemisphere
function createMap(data, stars, rotation, svgID) {
    let proj = d3.geoAzimuthalEqualArea()
        .rotate(rotation)
        .fitExtent([[5, 5], [svgSize - 5, svgSize - 5]], data);
    let gpath = d3.geoPath().projection(proj);
    const svg = d3.select(svgID);
    drawConstellations(svg, data.features, stars, proj, gpath, COLORS.inActive, true);

    //draw border
    svg.append("circle")
        .attr("cx", svgSize / 2)
        .attr("cy", svgSize / 2)
        .attr("r", ((svgSize - 10) / 2))
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("fill", "none");
}

//draw constellations based on projection, paths, and stars
function drawConstellations(svg, features, stars, proj, gpath, pathColor, attachEvent) {
    //scale star radius based on brightness
    sizeScale = d3.scaleLinear()
        .domain([6.07, -1.46]) // unit: magnitude
        .range([1, 5]) // unit: pixels

    // draw constellation
    svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', function (d) { return gpath(d); })
        .attr('stroke-width', 2)
        .attr('stroke', pathColor)
        .on("mouseover", e => {
            if (attachEvent) //only call animations if path in map (not datatip)
                mouseOverConstellation(e);
        })
        .on("mouseout", e => {
            if (attachEvent)
                mouseOffConstellation(e);
        });

    if (attachEvent)
        svg.selectAll("path")
            .attr('id', d => d.properties.name.replace(" ", "_"));

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
        .on("mouseover", e => {
            if (attachEvent)
                mouseOverStar(e);
        })
        .on("mouseout", e => {
            if (attachEvent)
                mouseOffStar(e);
        });

    addBlur(svg);
}

//add blurs on paths
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
        //hideDatatip();
        d3.selectAll(path)
            .transition().duration(200)
            .style('stroke-width', '2')
            .style('stroke', COLORS.justActive)
            .transition().duration(5000)
            .style('stroke', COLORS.inActive);
    }
}

//add options to search dropdown
function appendConstellations(data) {
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

//search filter function
function filter() {
    let searchField = document.getElementById("searchInput").value.toUpperCase().trim();
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

//draw datatips in side panel
function showDatatip(constellation) {
    //hide search
    d3.select("#dropdown")
        .classed("hidden", true);

    constellation = constellation.substring(1);
    constellation = constellation.replace("_", " ");
    info = constellationInfo.filter(item => item["Star Name"] == constellation)[0];

    let desc = info.Description;
    let history = info.History;

    let html = `<button id="returnToSearch" onclick="hideDatatip()"><i class="arrow left"></i> Return to Search</button>
                <p>${constellation}</p>
                <p>The ${desc}</p>
                <div><svg id="datatipImg" width=${datatipWidth - 10} height=${datatipWidth - 10}></svg></div>
                <p class="history">${history}</p>`;

    d3.select("#side-panel")
        .html(html);

    //draw constellation in svg
    //filter paths and stars for selected constellation
    let path = fullPaths.features.filter(feature => feature.properties.name == constellation)[0];
    let geojson = { "type": "FeatureCollection", "features": [path] };
    let stars = fullStars.filter(star => star["Constellation"] == constellation);

    //figure out what rotation to use (average lat and lon in path, removing duplicates)
    lon1 = path.geometry.coordinates.map(x => x[0][0]);
    lon2 = path.geometry.coordinates.map(x => x[1][0]);
    lon = lon1.concat(lon2);
    lon = [...new Set(lon)];

    //if constellation crosses over longitude 180, need transformation
    if (Math.max.apply(Math, lon) - Math.min.apply(Math, lon) > 180) {
        lon = lon.map(x => {
            if (x < 0) return 180 + (180 - Math.abs(x));
            else return x;
        })
        avgLon = (lon.reduce((x, y) => x + y, 0) / lon.length);
    }
    else {
        lon = lon.map(x => x + 180);
        avgLon = (lon.reduce((x, y) => x + y, 0) / lon.length) - 180;
    }

    lat1 = path.geometry.coordinates.map(x => x[0][1])
    lat2 = path.geometry.coordinates.map(x => x[1][1])
    lat = lat1.concat(lat2);
    lat = [...new Set(lat)];
    avgLat = lat.reduce((x, y) => x + y, 0) / lat.length;

    let imgPadding = 20;
    let proj = d3.geoAzimuthalEqualArea()
        .rotate([-avgLon, -avgLat])
        .fitExtent([[imgPadding, imgPadding], [datatipWidth - imgPadding - 10, datatipWidth - imgPadding - 10]], geojson)
    let gpath = d3.geoPath().projection(proj);

    let svg = d3.select("#datatipImg");
    drawConstellations(svg, geojson.features, stars, proj, gpath, COLORS.inActive, false);
}

function hideDatatip() {
    //show search
    d3.select("#dropdown")
        .classed("hidden", false);

    //clear datatip
    d3.select("#side-panel")
        .html("");

    //unactivate constellation
    activateConstellation(activeConstellation, false);
}