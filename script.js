function makeNodeLinkGraph() {
	
	const types = ["Grass","Fire","Water","Bug","Normal","Poison","Electric","Ground","Fairy","Fighting","Psychic","Rock","Ghost","Ice","Dragon","Flying","Steel"];
	const fills = ["#52AD18","#C72100","#0C66C1","#87950D","#B2B2B2","#6D2470","#E79302","#B18F34","#E28FE2","#682714","#DF366C","#A38A3F","#454592","#71D5F5","#6751C9","#5D73D4","#8D8D9F"];
	const outlines = ["#399400","#AE0800","#004DA8","#6E7C00","#999999","#540B57","#CE7A00","#98761B","#C976C9","#4F0E00","#C61D53","#8A7126","#2C2C79","#58BCDC","#4E38B0","#445ABB","#747486"];
	const height = 800;
  const width = 1000;
	
  function color(type, x){
		for( i = 0 ; i < types.length ; i++ ){if(type.localeCompare(types[i])==0){if(x==0){return fills[i];} if (x==1){return outlines[i];}}}
		return "#000000";}
  
  let r_scale = d3.scaleLinear().domain([175,590]).range([8,25]);
	
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
      var flying = [];
      for(let i = 0; i < response.species.length; i++){
        species.push(
          {species: response.species[i],
             index: response.index[i],
             typeA: response.typeA[i],
             typeB: response.typeB[i],
             baseHP: response.baseHP[i],
             baseAttack: response.baseAttack[i],
             baseDefense: response.baseDefense[i],
             baseSpeed: response.baseSpeed[i],
             baseSpecial: response.baseSpecial[i],
             total: response.total[i],
             sprite: response.sprite[i]
            }
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
        if((species[i].typeA === "Flying") || (species[i].typeB === "Flying")){
          flying.push(species[i].species);
        }
      }
      console.log("grass: " + JSON.stringify(grass));
      links2 = addLinks(grass, "grass", links2);
      links2 = addLinks(fire, "fire", links2);
      links2 = addLinks(water, "water", links2);
      links2 = addLinks(bug, "bug", links2);
      links2 = addLinks(normal, "normal", links2);
      links2 = addLinks(poison, "poison", links2);
      links2 = addLinks(electric, "electric", links2);
      links2 = addLinks(ground, "ground", links2);
      links2 = addLinks(fairy, "fairy", links2);
      links2 = addLinks(fighting, "fighting", links2);
      links2 = addLinks(psychic, "psychic", links2);
      links2 = addLinks(rock, "rock", links2);
      links2 = addLinks(ice, "ice", links2);
      links2 = addLinks(ghost, "ghost", links2);
      links2 = addLinks(dragon, "dragon", links2);
      links2 = addLinks(flying, "flying", links2);

      console.log("links2: " + JSON.stringify(links2));

      const nodes = species.map(d => Object.create(d));
      const index = new Map(nodes.map(d => [d.species, d]));
      const links = links2.map(d => Object.assign(Object.create(d), {
        source: index.get(d.source),
        target: index.get(d.target)
      }));

      console.log("index: \n");
      console.log(index);
      console.log("nodes: \n");
      console.log(nodes);

      // const svg = d3.select(DOM.svg(width, height));
      const svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
		
	const legend = svg.append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5);
	
	var legend_height = 500;
	var legend_top_y = (height - legend_height)/2;
	
	legend.append("rect")
		.attr("stroke","black")
		.attr("fill", "none")
		.attr("x",(width-100))
		.attr("y",legend_top_y)
		.attr("width",100)
		.attr("height",legend_height);
		
	legend
		.selectAll("circle")
		.data(types)
		.enter().append("circle")
		  .attr("r", 5)
		  .attr("fill", d => color(d, 0))
			.attr("stroke", d => color(d, 1))
		  .attr("cx", (width-90))
		  .attr("cy", (d,i) => (legend_top_y + (i+1) * legend_height/18));
		  
	legend
		.selectAll("text")
		.data(types)
		.enter().append("text")
		  .attr("x", (width-75))
		  .attr("y", (d,i) => (legend_top_y + (i+1) * legend_height/18 + 5))
		  .attr("class", "legend")
		  .text(d => d);

      const layout = cola.d3adaptor(d3)
      	  .convergenceThreshold(0.001)
      	  .avoidOverlaps(true)
          .size([width, height])
          .nodes(nodes)
          .links(links)
          .jaccardLinkLengths(55, 0.7)
      	  .symmetricDiffLinkLengths(15)
          .start(30,30,30);
      
      const link = svg.append("g")
          .attr("stroke", "#626262")
          .attr("stroke-opacity", 0.5)
        .selectAll("line")
        .data(links)
        .enter().append("line")
          .attr("stroke-width", d => Math.sqrt(d.value));

      const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
          .attr("r", d => r_scale(d.total))
          .attr("fill", d => color(d.typeA, 0))
      	  .attr("stroke", function(d){if(d.typeB){return color(d.typeB, 1);} else{return color(d.typeA, 1);}})
          .attr("stroke-width", 4)
          .call(layout.drag)
	  .each(function (d){
            var b = this.getBBox();
            d.width = b.width;
            d.height = b.height;});
	
      node.append("title")
		.html(d => {
	      		if (d.typeB) {
				return "<div style='width:60px;height:60px;background-image:url("+d.sprite+")'>\n<div>" + d.species + "\n"
		  		+ d.typeA + "/" + d.typeB + "\nStats:\n  HP: " + d.baseHP + "\n  Attack: " + d.baseAttack
		  		+ "\n  Defense: " + d.baseDefense + "\n  Speed: " + d.baseSpeed
		  		+ "\n  Special: " + d.baseSpecial + "\n  Total: " + d.total + "</div>";
			} else {
				return "<div style='width:60px;height:60px;background-image:url("+d.sprite+")'>\n<div>" + d.species + "\n"
		  		+ d.typeA + "\nStats:\n  HP: " + d.baseHP + "\n  Attack: " + d.baseAttack
		 		+ "\n  Defense: " + d.baseDefense + "\n  Speed: " + d.baseSpeed
		  		+ "\n  Special: " + d.baseSpecial + "\n  Total: " + d.total + "</div>";
	  		}
      		});
	  
	  
          //.text(d => (d.species + ", " + d.typeA + ", " + d.typeB));

      layout.on("tick", () => {
        link
            .attr("x1", function(d){
		if(d.source.x>875){return 875;}
		else if(d.source.x<25){return 25;}
		else{return d.source.x;}})
            .attr("y1", function(d){
		if(d.source.y>775){return 775;}
		else if(d.source.y<25){return 25;}
		else{return d.source.y;}})
            .attr("x2", function(d){
		if(d.target.x>875){return 875;}
		else if(d.target.x<25){return 25;}
		else{return d.target.x;}})
            .attr("y2", function(d){
		if(d.target.y>775){return 775;}
		else if(d.target.y<25){return 25;}
		else{return d.target.y;}});

        node
            .attr("cx", function(d){
		if(d.x>875){return 875;}
		else if(d.x<25){return 25;}
		else{return d.x;}})
            .attr("cy", function(d){
		if(d.y>775){return 775;}
		else if(d.y<25){return 25;}
		else{return d.y;}});
      });

      invalidation.then(() => layout.stop());

      return svg.node();
    });
    
}

function addLinks(d, type, links2) {
  // var newLinks = [];
  for(let i = 0; i < d.length-1; i++){
    for(let j = i+1; j<d.length; j++){
      links2.push({
        source: d[i], target: d[j], value: type
      })
    }
  }
  return links2;
}
