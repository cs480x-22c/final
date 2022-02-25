Promise.all(
  [d3.json('map.geojson')]).then( ([countries]) => {
  createMap(countries)
})
	var width = 960,
    height = 600

  function createMap(countries) {
	features = countries.features
	var fixed = features.map(function(feature) {
        return turf.rewind(feature,{reverse:true});
    })
  var proj = d3.geoMercator()
	.center([0, 42.27375])
    .rotate([71.808444, 0])
    .translate([250, 250])
    .scale(300000);

  var gpath = d3.geoPath()
    .projection(proj);

  var ccolor = 
    d3.scaleSequential( d3.interpolateBlues )
    .domain( 
      d3.extent( fixed, d => gpath.area(d))
      );


  // draw country boundaries
  d3.select('svg')
    .append('g')
    .attr('id', 'countries')
    .selectAll('path')
    .data(fixed)
    .enter()
    .append('path')
      .attr('d', function(d) { console.log(d); return gpath(d); })
      .attr('stroke-width', 1)
      .attr('stroke', 'steelblue')
      .attr('id', d => d.id)
      .attr('fill', d => ccolor( gpath.area(d)) );


   var mapZoom = d3.zoom()
    .on('zoom', zoomed);

  var zoomSettings = d3.zoomIdentity
    .translate(250, 250)
    .scale(3000000);

  d3.select('svg')
    .call(mapZoom)
    .call(mapZoom.transform, zoomSettings);

  function zoomed(e) {
    proj
      .translate([e.transform.x, e.transform.y])
      .scale(e.transform.k);

    console.log(e.transform.k);

    if( e.transform.k > 400 ) 
      console.log('toggle adaptive map feature');

    // redraw map with new projection settings
    d3.selectAll('path')
      .attr('d', gpath);

    d3.selectAll('circle')
      .attr('cx', d => proj([d.x, d.y])[0])
      .attr('cy', d => proj([d.x, d.y])[1])
  }
}