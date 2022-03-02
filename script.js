function makeNodeLinkGraph() {
  const color = d3.scaleOrdinal(d3.schemeCategory10),
        height = 500,
        width = 500;
        
  const data = d3.json("data.json")
    .then((response) => {
      console.log(response);
      var species = [];
      var links2 = [];
      var grass = [];
      var fire = [];
      var water = [];
      var bug = [];
      var normal = [];
      var poison = [];
      var electric = [];
      var ground = [];
      var fairy = [];
      var fighting = [];
      var psychic = [];
      var rock = [];
      var ghost = [];
      var ice = [];
      var dragon = [];
      for(let i = 0; i < response.species.length; i++){
        species.push(
          {species: response.species[i], index: response.index[i], typeA: response.typeA[i], typeB: response.typeB[i]}
        )
      }
      console.log("species: " + JSON.stringify(species));
      //add species to their type arrays
      for(let i = 0; i < species.length; i ++){
        if((species[i].typeA === "Grass") || (species[i].typeB === "Grass")){
          grass.push(species[i].species);
        }
        if((species[i].typeA === "Fire") || (species[i].typeB === "Fire")){
          fire.push(species[i].species);
        }
        if((species[i].typeA === "Water") || (species[i].typeB === "water")){
          water.push(species[i].species);
        }
        if((species[i].typeA === "Bug") || (species[i].typeB === "Bug")){
          bug.push(species[i].species);
        }
        if((species[i].typeA === "Normal") || (species[i].typeB === "Normal")){
          normal.push(species[i].species);
        }
        if((species[i].typeA === "Poison") || (species[i].typeB === "Poison")){
          poison.push(species[i].species);
        }
        if((species[i].typeA === "Electric") || (species[i].typeB === "Electric")){
          electric.push(species[i].species);
        }
        if((species[i].typeA === "Ground") || (species[i].typeB === "Ground")){
          ground.push(species[i].species);
        }
        if((species[i].typeA === "Fairy") || (species[i].typeB === "Fairy")){
          fairy.push(species[i].species);
        }
        if((species[i].typeA === "Fighting") || (species[i].typeB === "Fighting")){
          fighting.push(species[i].species);
        }
        if((species[i].typeA === "Psychic") || (species[i].typeB === "Psychic")){
          psychic.push(species[i].species);
        }
        if((species[i].typeA === "Rock") || (species[i].typeB === "Rock")){
          rock.push(species[i].species);
        }
        if((species[i].typeA === "Ghost") || (species[i].typeB === "Ghost")){
          ghost.push(species[i].species);
        }
        if((species[i].typeA === "Ice") || (species[i].typeB === "Ice")){
          ice.push(species[i].species);
        }
        if((species[i].typeA === "Dragon") || (species[i].typeB === "Dragon")){
          dragon.push(species[i].species);
        }
      }
      console.log("grass: " + JSON.stringify(grass));
      links2.push(addLinks(grass, "grass"));
      links2.push(addLinks(fire, "fire"));
      links2.push(addLinks(water, "water"));
      links2.push(addLinks(bug, "bug"));
      links2.push(addLinks(normal, "normal"));
      links2.push(addLinks(poison, "poison"));
      links2.push(addLinks(electric, "electric"));
      links2.push(addLinks(ground, "ground"));
      links2.push(addLinks(fairy, "fairy"));
      links2.push(addLinks(fighting, "fighting"));
      links2.push(addLinks(psychic, "psychic"));
      links2.push(addLinks(rock, "rock"));
      links2.push(addLinks(ice, "ice"));
      links2.push(addLinks(ghost, "ghost"));
      links2.push(addLinks(dragon, "dragon"));

      console.log("links2: " + JSON.stringify(links2));

      const nodes = species.map(d => Object.create(d));
      const index = new Map(nodes.map(d => [d.id, d]));
      const links = links2.map(d => Object.assign(Object.create(d), {
        source: index.get(d.source),
        target: index.get(d.target)
      }));

      console.log("index: \n");
      console.log(index);
      console.log("nodes.species: " + nodes.species);
      console.log("nodes.id: " + nodes.id);
      console.log("nodes: \n");
      console.log(nodes);

      // const svg = d3.select(DOM.svg(width, height));
      const svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

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
          .attr("fill", d => color(d.typeA))
          .call(layout.drag);

      node.append("title")
          .text(d => d.species);

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
    });
    
  
  // const nodes = data.nodes.map(d => Object.create(d));
  // const index = new Map(nodes.map(d => [d.id, d]));
  // const links = data.links.map(d => Object.assign(Object.create(d), {
  //   source: index.get(d.source),
  //   target: index.get(d.target)
  // }));

  // const nodes = species.map(d => Object.create(d));
  // const index = new Map(nodes.map(d => [d.id, d]));
  // const links2 = links.map(d => Object.assign(Object.create(d), {
  //   source: index.get(d.source),
  //   target: index.get(d.target)
  // }));

  // const svg = d3.select(DOM.svg(width, height));

  // const layout = cola.d3adaptor(d3)
  //     .size([width, height])
  //     .nodes(nodes)
  //     .links(links2)
  //     .jaccardLinkLengths(40, 0.7)
  //     .start(30);
  
  // const link = svg.append("g")
  //     .attr("stroke", "#999")
  //     .attr("stroke-opacity", 0.6)
  //   .selectAll("line")
  //   .data(links2)
  //   .enter().append("line")
  //     .attr("stroke-width", d => Math.sqrt(d.value));

  // const node = svg.append("g")
  //     .attr("stroke", "#fff")
  //     .attr("stroke-width", 1.5)
  //   .selectAll("circle")
  //   .data(nodes)
  //   .enter().append("circle")
  //     .attr("r", 5)
  //     .attr("fill", d => color(d.group))
  //     .call(layout.drag);

  // node.append("title")
  //     .text(d => d.id);

  // layout.on("tick", () => {
  //   link
  //       .attr("x1", d => d.source.x)
  //       .attr("y1", d => d.source.y)
  //       .attr("x2", d => d.target.x)
  //       .attr("y2", d => d.target.y);

  //   node
  //       .attr("cx", d => d.x)
  //       .attr("cy", d => d.y);
  // });

  // invalidation.then(() => layout.stop());

  // return svg.node();
}

function addLinks(d, type) {
  var newLinks = [];
  for(let i = 0; i < d.length-1; i++){
    for(let j = i+1; j<d.length; j++){
      newLinks.push({
        source: d[i], target: d[j], value: type
      })
    }
  }
  return newLinks;
}