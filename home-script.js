//load files
Promise.all([
    d3.json('datasets/paths.geojson')
]).then(([paths]) => {
    draw(paths);
});

function draw(paths) {
    let constellation = "Orion";
    let path = paths.features.filter(feature => feature.properties.name == constellation)[0];
    let geojson = { "type": "FeatureCollection", "features": [path] };
    const svg = d3.select("#homeConstellation");

    let proj = d3.geoAzimuthalEqualArea()
        .rotate([-90, -40])
        .fitExtent([[5, 5], [200 - 5, 200 - 5]], geojson);
    let gpath = d3.geoPath().projection(proj);

    //draw path
    svg.selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', function (d) { return gpath(d); })
        .attr('stroke-width', 2)
        .attr('stroke', "gray");
}

