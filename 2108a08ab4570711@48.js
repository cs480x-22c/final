// https://observablehq.com/@d3/world-airports@48
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["airports.csv",new URL("./files/3ba6ffc2faf6f7ee4be0ed0566243932de17192846f8645847a5f7b580b339f9ba604a70b017eeaa8c4a5e1a4032d5a87e828a8e73512d5445226b3b83ac7a29",import.meta.url)],["land-50m.json",new URL("./files/7b6ff41e373e01d7b5b95773e297d40625bd9ccc1936a023a066a7edd8da5eaadec4ab7a565303539e41e001f2e6730f3ee1e259fae4f19dc59e8d6b2f2ec22b",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# World Airports

This map demonstrates how to overlay CSV point data on a world map. See also a map of [U.S. state capitals](/@d3/u-s-state-capitals).`
)});
  main.variable(observer("map")).define("map", ["d3","width","height","path","outline","location","graticule","land","data","projection"], function(d3,width,height,path,outline,location,graticule,land,data,projection)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const defs = svg.append("defs");

  defs.append("path")
      .attr("id", "outline")
      .attr("d", path(outline));

  defs.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", new URL("#outline", location));

  const g = svg.append("g")
      .attr("clip-path", `url(${new URL("#clip", location)})`);

  g.append("use")
      .attr("xlink:href", new URL("#outline", location))
      .attr("fill", "#fff");

  g.append("path")
      .attr("d", path(graticule))
      .attr("stroke", "#ddd")
      .attr("fill", "none");

  g.append("path")
      .attr("d", path(land))
      .attr("fill", "#ddd");

  svg.append("use")
      .attr("xlink:href", new URL("#outline", location))
      .attr("stroke", "#000")
      .attr("fill", "none");

  svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${projection([d.longitude, d.latitude])})`)
      .attr("r", 1.5)
    .append("title")
      .text(d => d.name);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("airports.csv").csv({typed: true})
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoNaturalEarth1()
)});
  main.variable(observer("height")).define("height", ["d3","projection","width","outline"], function(d3,projection,width,outline)
{
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
);
  main.variable(observer("outline")).define("outline", function(){return(
{type: "Sphere"}
)});
  main.variable(observer("graticule")).define("graticule", ["d3"], function(d3){return(
d3.geoGraticule10()
)});
  main.variable(observer("land")).define("land", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.land)
)});
  main.variable(observer("world")).define("world", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("land-50m.json").json()
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
