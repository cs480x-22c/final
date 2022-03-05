<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	export let domain;
	export let range;
	let x, y, margin, width, height;
	let svg;
	export let data;
    let oldlines;

	let mounted = false;
	onMount(() => {
		mounted = true;
		setupAxes();
	});

	$: if (mounted && data) {
        if(oldlines) oldlines.remove();
		oldlines = drawlines(data);
	}

	function setupAxes() {
		// set the dimensions and margins of the graph
		margin = { top: 30, right: 10, bottom: 10, left: 0 };
		width = 500 - margin.left - margin.right;
		height = 300 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		svg = d3
			.select('#my_dataviz')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// For each dimension, I build a linear scale. I store all in a y object
		y = {};
		for (let axis in domain) {
			y[domain[axis]] = d3.scaleLinear().domain(range).range([height, 0]);
		}

		// Build the X scale -> it find the best position for each Y axis
		x = d3.scalePoint().range([0, width]).padding(1).domain(domain);

		// Draw the axis:
		svg
			.selectAll('myAxis')
			// For each dimension of the dataset I add a 'g' element:
			.data(domain)
			.enter()
			.append('g')
			// I translate this element to its right position on the x axis
			.attr('transform', (d) => `translate(${x(d)})`)
			// Add axis title
			.append('text')
			.style('text-anchor', 'middle')
			.attr('y', -9)
			.text((d) => d)
			.style('fill', 'black');
	}

	function drawlines(data) {
		if (svg && data.length > 0) {
			// Draw the lines
			return svg
				.selectAll('myPath')
				.data(data)
				.enter()
				.append('path')
				.attr('d', (d) =>
					// The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
					{
						return d3.line()(
							domain.map((p) => {
								return [x(p), y[p](d[p])];
							})
						);
					}
				)
				.style('fill', 'none')
				.style('stroke', '#69b3a2')
				.style('opacity', 0.5);
		}
	}
</script>

<div id="my_dataviz" />

<style>
	#my_dataviz {
		width: 50vw;
		height: auto;
	}
</style>
