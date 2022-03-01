if (moment().hour() == 23) {
  var initialDate = moment().add(1, 'days').toDate().toLocaleDateString('en-US')
}
else {
  var initialDate = new Date().toLocaleDateString('en-US')
}
var initialHour = moment(moment().hour() + 1, 'HH:mm').format('h:mm A')

Promise.all(
  [d3.json('map.geojson')]).then(([buildings]) => {
    createMap(buildings)
    colorBuildings(initialDate, initialHour)
  })

function createMap(buildings) {
  features = buildings.features
  var fixed = features.map(function (feature) {
    return turf.rewind(feature, { reverse: true });
  })

  var proj = d3.geoMercator()
    .center([0, 42.27375])
    .rotate([71.808444, 0])
    .translate([250, 250])
    .scale(3000000);

  var gpath = d3.geoPath()
    .projection(proj);

  // draw country boundaries
  d3.select('svg')
    .append('g')
    .attr('id', 'buildings')
    .selectAll('path')
    .data(fixed)
    .enter()
    .append('path')
    .attr('d', function (d) { return gpath(d); })
    .attr('stroke-width', 1)
    .attr('stroke', 'steelblue')
    .attr('id', d => d.properties.name)
    .attr('fill', "white");
}

function colorBuildings(date, hour) {
  var locs = ["AK", "FL", "KH", "SL", "WB", "UH", "SH", "AH", "RILEY", "FBC", "WEST", "HA", "IS", "RC", "QUAD", "HL", "CC", "OH", "GH", "HH", "MORGAN", "CRC", "AF", "GP", "RT", "OASIS"]
  d3.select("#time").text(`Showing events on ${date} with a ${hour} start time`)
  d3.csv("updated_25data.csv").then(function (data) {
    var filteredSelection = data.filter(function (d) { return d.Day === date && d.Event_Start === hour })
    var dailyEvents = {};
    var numEvents = []
    locs.forEach(function(element) {
      dailyEvents[element] = filteredSelection.filter(function (d) { return d.Location1 === element})
      numEvents.push(dailyEvents[element].length)
    })
    var bcolor = d3.scaleSequential(d3.interpolateBlues).domain(d3.extent(numEvents));
  d3.selectAll("path")
    .attr("fill", function(d, i) {return bcolor(numEvents[i])})
    .on
  })
}

function reset() {
  d3.select("#calendar").html("")
  document.getElementById("myForm").reset()
  document.getElementById("myInputTime").value = ""
  colorBuildings(initialDate, initialHour)
}