function makeNodeLinkGraph() {
  const color = d3.scaleOrdinal(d3.schemeCategory10),
        height = 500;
        
  const data = d3.json("data.json")
    .then((response) => {
      console.log(response);
      // response.json();
      var nodes = [];
      var links = [];
      for(var i = 0; i < response.species.length; i++){
        nodes.push(
          {species: response.species[i], index: response.index[i], typeA: response.typeA[i], typeB: response.typeB[i]}
        )
      }
      console.log("nodes: " + JSON.stringify(nodes));
    });
  
  // chart = {
  const species = data.species.map(d => Object.create(d));
  const typeA = data.typeA.map(d => Object.create(d));
  const typeB = data.typeB.map(d => Object.create(d));
  console.log("species: " + species);
  console.log("typeA: " + typeA);
  console.log("typeB: " + typeB);

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