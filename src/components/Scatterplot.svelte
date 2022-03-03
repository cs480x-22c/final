<script>
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';

	export let points;

	let svg;
	let width = 500;
	let height = 200;

	const padding = { top: 20, right: 40, bottom: 40, left: 100 };

	$: xScale = scaleLinear()
		.domain([0, 1250])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, 1250])
		.range([height - padding.bottom, padding.top]);


	onMount(resize);

	function resize() {
		({ width, height } = svg.getBoundingClientRect());
	}

	let xTicks = linspace(0,1100,23);
	let yTicks = linspace(0,1100,23);

	function linspace(start, stop, steps) {
		var arr = [];
		var step = (stop - start) / (steps - 1);
		for (var i = 0; i < steps; i++) {
			arr.push(start + step * i);
		}
		return arr;
	}
</script>

<svelte:window on:resize='{resize}'/>

<svg bind:this={svg}>
	<!-- y axis -->
	<g class='axis y-axis'>
		{#each yTicks as tick}
			<g class='tick tick-{tick}' transform='translate(0, {yScale(tick)})'>
				<line x1='{padding.left}' x2='{xScale(1200)}'/>
				<text x='{padding.left - 8}' y='+4'>{tick}</text>
			</g>
			<text y='{height/2}' x='{padding.left-12}'  transform='rotate(40deg)' > yAxis </text>
		{/each}
	</g>

	<!-- x axis -->
	<g class='axis x-axis'>
		{#each xTicks as tick}
			<g class='tick' transform='translate({xScale(tick)},0)'>
				<line y1='{yScale(0)}' y2='{yScale(1150)}'/>
				<text y='{height - padding.bottom + 16}'>{tick}</text>
			</g>
		{/each}
		<text y='{height - padding.bottom + 25}' x='{width/2}'> xAxis </text>
	</g>

	<!-- data -->
	{#if points}
	{#each points as point}
		<circle cx='{xScale(point.x)}' cy='{yScale(point.y)}' r='5'/>
	{/each}
	{/if}
</svg>

<style>
	svg {
		width: 1200px;
		height: 650px;
		float: left;
	}

	circle {
		fill: orange;
		fill-opacity: 0.6;
		stroke: rgba(0,0,0,0.5);
	}

	.tick line {
		stroke: #ddd;
		stroke-dasharray: 2;
	}

	text {
		font-size: 12px;
		fill: #999;
	}

	.x-axis text {
		text-anchor: middle;
	}

	.y-axis text {
		text-anchor: end;
	}
</style>